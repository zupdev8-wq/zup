import React,{useEffect,useMemo,useRef,useState} from 'react';
import {ActivityIndicator,Alert,Linking,Pressable,TextInput,View} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import type {Progress} from '../types';
import type {PremiumStatus} from '../services/backend';
import {backendConfigured,createPremiumCheckout,getPremiumPurchase,getRecoveryCode,restorePremiumAccess} from '../services/backend';
import {Txt,Page,Card,Chip,Button} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';

type Props={
  p:Progress;
  status:PremiumStatus;
  loading:boolean;
  error:string|null;
  refresh:()=>Promise<PremiumStatus>;
  exam:()=>void;
  marathon:()=>void;
};

type Flow='idle'|'purchase'|'restore';
const benefits=[
  ['brain','Simulado Inteligente','Descreva a prova, banca, cargo ou curso e o ZUP monta um simulado com explicações curtas.'],
  ['bolt','Maratonas Premium','Sessões maiores para aprofundar temas sem repetir o que você já respondeu.'],
  ['trophy','Mapa e treino avançado','Use erros e acertos para enxergar seus pontos fortes e o que precisa revisar.'],
  ['paw','Evolução do jogador','Continue fortalecendo companheiros, níveis, XP, estrelas e conquistas.'],
] as const;

function dateBR(value:string|null){if(!value)return '';const d=new Date(value);return Number.isNaN(d.getTime())?'':d.toLocaleDateString('pt-BR');}
function cleanRecovery(value:string){return value.toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,19);}

export function PremiumScreen({p,status,loading,error,refresh,exam,marathon}:Props){
  const [flow,setFlow]=useState<Flow>('idle'),[busy,setBusy]=useState(false),[pendingId,setPendingId]=useState<string|null>(null),[checking,setChecking]=useState(false);
  const [restoreCode,setRestoreCode]=useState(''),[recoveryCode,setRecoveryCode]=useState<string|null>(null),[showRecovery,setShowRecovery]=useState(false);
  const pollRef=useRef<ReturnType<typeof setTimeout>|null>(null);
  const active=status.active;
  const price=useMemo(()=>status.price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}),[status.price]);

  useEffect(()=>()=>{if(pollRef.current)clearTimeout(pollRef.current);},[]);
  useEffect(()=>{
    if(!pendingId||active)return;
    let stopped=false;
    const check=async()=>{
      if(stopped)return;
      setChecking(true);
      try{
        const next=await getPremiumPurchase(pendingId,p.nickname);
        if(next.premium.active){
          await refresh();
          const code=await getRecoveryCode(p.nickname).catch(()=>null);
          if(code){setRecoveryCode(code);setShowRecovery(true);}
          setPendingId(null);setFlow('idle');
          Alert.alert('Premium liberado','Pagamento confirmado. Guarde seu código de recuperação para usar se trocar de aparelho.');
          return;
        }
        if(['rejected','cancelled','refunded','charged_back','error','invalid'].includes(next.status)){
          setPendingId(null);
          Alert.alert('Pagamento não concluído','O Mercado Pago não confirmou este pagamento. Você pode tentar novamente.');
          return;
        }
      }catch{}finally{setChecking(false);}
      if(!stopped)pollRef.current=setTimeout(check,3500);
    };
    void check();
    return()=>{stopped=true;if(pollRef.current)clearTimeout(pollRef.current);};
  },[pendingId,active,p.nickname,refresh]);

  const startCheckout=async()=>{
    if(!backendConfigured()){Alert.alert('Pagamento ainda não conectado','A tela já está pronta. Quando conectarmos o backend do ZUP ao Mercado Pago, este botão abrirá o checkout para escolher Pix ou cartão.');return;}
    try{
      setBusy(true);
      const out=await createPremiumCheckout(p.nickname);
      setPendingId(out.purchaseId);
      await Linking.openURL(out.checkoutUrl);
    }catch(err){Alert.alert('Não foi possível abrir o pagamento',messageFor(err));}
    finally{setBusy(false);}
  };
  const restore=async()=>{
    const code=restoreCode.trim();
    if(!/^ZUP-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code)){
      Alert.alert('Confira o código','Digite o código no formato ZUP-XXXX-XXXX-XXXX.');return;
    }
    if(!backendConfigured()){Alert.alert('Recuperação ainda não conectada','Quando o backend estiver online, este código localizará seu Premium e transferirá o acesso para este aparelho.');return;}
    try{
      setBusy(true);
      const out=await restorePremiumAccess(code,p.nickname);
      await refresh();
      setRecoveryCode(out.recoveryCode);setShowRecovery(true);setFlow('idle');setRestoreCode('');
      Alert.alert('Premium recuperado','Este aparelho agora tem o seu acesso. Geramos um novo código de recuperação; guarde o código mostrado na tela.');
    }catch(err){Alert.alert('Não foi possível recuperar',messageFor(err));}
    finally{setBusy(false);}
  };
  const revealRecovery=async()=>{
    if(showRecovery){setShowRecovery(false);return;}
    if(!backendConfigured()){Alert.alert('Código disponível após conexão','O código será criado e protegido pelo backend quando conectarmos o ZUP.');return;}
    try{setBusy(true);const code=await getRecoveryCode(p.nickname);setRecoveryCode(code);setShowRecovery(true);}catch(err){Alert.alert('Não foi possível mostrar o código',messageFor(err));}finally{setBusy(false);}
  };

  return <Page contentContainerStyle={{paddingBottom:54,gap:16}} keyboardShouldPersistTaps="handled">
    <Card color={active?C.greenLight:C.yellow} outlined style={{padding:20,gap:12}}>
      <Chip color={C.white} icon={active?'check':'sparkles'}>{active?'PREMIUM ATIVO':'ZUP! PREMIUM'}</Chip>
      <Txt size={31} bold>{active?'Seu modo de estudo completo está liberado.':'Aprenda mais fundo quando quiser.'}</Txt>
      <Txt size={15}>{active?`Acesso até ${dateBR(status.premiumUntil)}.`:`${price} libera 30 dias de Premium. Sem cadastro e sem login.`}</Txt>
      {loading&&<View style={{flexDirection:'row',alignItems:'center',gap:8}}><ActivityIndicator color={C.ink}/><Txt size={12}>Confirmando seu acesso...</Txt></View>}
    </Card>

    {active&&<>
      <Pressable onPress={exam} accessibilityRole="button"><Card color={C.blueLight} outlined style={{flexDirection:'row',alignItems:'center',gap:12}}>
        <View style={{width:56,height:56,borderRadius:18,backgroundColor:C.ink,alignItems:'center',justifyContent:'center'}}><Icon name="brain" size={27} color={C.yellow}/></View>
        <View style={{flex:1,gap:3}}><Chip color={C.white}>PREMIUM</Chip><Txt size={19} bold>Simulado Inteligente</Txt><Txt size={12} color={C.muted}>Escreva a prova, banca, cargo ou curso e escolha 20, 45 ou 60 questões.</Txt></View><Icon name="chevron" size={19}/>
      </Card></Pressable>
      <Pressable onPress={marathon} accessibilityRole="button"><Card outlined style={{flexDirection:'row',alignItems:'center',gap:12}}>
        <View style={{width:52,height:52,borderRadius:17,backgroundColor:C.lemon,alignItems:'center',justifyContent:'center'}}><Icon name="bolt" size={25}/></View>
        <View style={{flex:1}}><Txt size={17} bold>Maratona de 10 perguntas</Txt><Txt size={12} color={C.muted}>Uma sessão maior com assuntos escolhidos no ZUP.</Txt></View><Icon name="chevron" size={18}/>
      </Card></Pressable>

      <Pressable onPress={()=>void revealRecovery()} accessibilityRole="button">
        <Card outlined style={{flexDirection:'row',alignItems:'center',gap:12}}>
          <View style={{width:48,height:48,borderRadius:16,backgroundColor:C.silver,alignItems:'center',justifyContent:'center'}}><Icon name="shield" size={23}/></View>
          <View style={{flex:1}}><Txt size={15} bold>{showRecovery?'Ocultar código de recuperação':'Ver meu código de recuperação'}</Txt><Txt size={11} color={C.muted}>Use apenas se precisar trocar de aparelho ou reinstalar o ZUP.</Txt></View><Icon name="chevron" size={18}/>
        </Card>
      </Pressable>
    </>}

    {showRecovery&&recoveryCode&&<Card color={C.lemon} outlined style={{gap:10,alignItems:'center'}}>
      <Chip color={C.white} icon="shield">GUARDE ESTE CÓDIGO</Chip>
      <Txt size={23} bold style={{letterSpacing:1,textAlign:'center'}}>{recoveryCode}</Txt>
      <Txt size={12} color={C.muted} style={{textAlign:'center'}}>Ele é a chave para recuperar seu Premium em outro aparelho. Não publique nem compartilhe.</Txt>
      <Pressable onPress={()=>void Clipboard.setStringAsync(recoveryCode).then(()=>Alert.alert('Código copiado','Guarde-o em um lugar seguro.'))} accessibilityRole="button" style={{minHeight:48,paddingHorizontal:18,borderRadius:18,backgroundColor:C.ink,alignItems:'center',justifyContent:'center'}}><Txt bold color={C.white}>Copiar código</Txt></Pressable>
    </Card>}

    {!active&&flow==='idle'&&<Card outlined style={{gap:12}}>
      <Button title={`Quero ser Premium · ${price}`} icon="star" onPress={()=>setFlow('purchase')}/>
      <Pressable onPress={()=>setFlow('restore')} accessibilityRole="button" style={{minHeight:48,alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
        <Txt size={13} bold>Troquei de aparelho e já era Premium</Txt>
        <Txt size={11} color={C.muted}>Recuperar com meu código</Txt>
      </Pressable>
    </Card>}

    {!active&&flow==='purchase'&&<Card outlined style={{gap:13}}>
      <View><Txt size={21} bold>Ativar ZUP! Premium</Txt><Txt size={13} color={C.muted}>{price} · 30 dias · renovação quando você quiser.</Txt></View>
      <Card color={C.blueLight}><Txt size={13}>Você será levado ao ambiente seguro do Mercado Pago e escolhe <Txt bold>Pix ou cartão</Txt> por lá. Os dados de pagamento ficam no ambiente seguro do Mercado Pago; o ZUP não recebe número do cartão, CVV ou senha.</Txt></Card>
      <Button title={busy?'Abrindo Mercado Pago...':'Continuar para Pix ou cartão'} disabled={busy} variant="dark" icon="external" onPress={()=>void startCheckout()}/>
      {pendingId&&<View style={{flexDirection:'row',alignItems:'center',gap:8}}>{checking&&<ActivityIndicator size="small" color={C.ink}/>}<Txt size={12} color={C.muted}>Aguardando confirmação do Mercado Pago...</Txt></View>}
      {error&&error!=='api_not_configured'&&<Txt size={12} color={C.red}>Não foi possível confirmar o status agora. Tente novamente.</Txt>}
      <Pressable onPress={()=>setFlow('idle')} accessibilityRole="button" style={{minHeight:42,alignItems:'center',justifyContent:'center'}}><Txt size={12} bold color={C.muted}>Voltar</Txt></Pressable>
    </Card>}

    {!active&&flow==='restore'&&<Card outlined style={{gap:13}}>
      <View><Txt size={21} bold>Recuperar Premium</Txt><Txt size={13} color={C.muted}>Digite o código que o ZUP mostrou quando seu Premium foi ativado.</Txt></View>
      <TextInput value={restoreCode} onChangeText={v=>setRestoreCode(cleanRecovery(v))} autoCapitalize="characters" autoCorrect={false} maxLength={19} placeholder="ZUP-XXXX-XXXX-XXXX" placeholderTextColor={C.muted} style={{minHeight:56,borderWidth:1.5,borderColor:C.line,borderRadius:17,paddingHorizontal:14,fontSize:17,fontWeight:'700',letterSpacing:.5,color:C.ink,backgroundColor:C.white}}/>
      <Txt size={11} color={C.muted}>Ao recuperar, o acesso é transferido para este aparelho e um novo código é criado.</Txt>
      <Button title={busy?'Recuperando...':'Recuperar neste aparelho'} disabled={busy} icon="refresh" onPress={()=>void restore()}/>
      <Pressable onPress={()=>{setFlow('idle');setRestoreCode('');}} accessibilityRole="button" style={{minHeight:42,alignItems:'center',justifyContent:'center'}}><Txt size={12} bold color={C.muted}>Voltar</Txt></Pressable>
    </Card>}

    {benefits.map(([icon,title,body])=><Card key={title} outlined style={{flexDirection:'row',alignItems:'flex-start',gap:12}}>
      <View style={{width:48,height:48,borderRadius:16,backgroundColor:C.lemon,alignItems:'center',justifyContent:'center'}}><Icon name={icon} size={23}/></View>
      <View style={{flex:1,gap:4}}><Txt bold size={16}>{title}</Txt><Txt size={13} color={C.muted}>{body}</Txt></View>
    </Card>)}

    {active&&<Pressable onPress={()=>void refresh()} accessibilityRole="button" style={{minHeight:48,alignItems:'center',justifyContent:'center'}}><Txt size={13} bold color={C.muted}>Verificar acesso novamente</Txt></Pressable>}
  </Page>;
}

function messageFor(err:unknown){
  const m=err instanceof Error?err.message:'';
  if(m==='api_not_configured')return 'O backend do ZUP ainda não foi conectado.';
  if(m==='payments_not_configured'||m==='mercado_pago_not_configured')return 'O Mercado Pago ainda não foi configurado no backend.';
  if(m==='invalid_recovery_code')return 'O formato do código de recuperação é inválido.';
  if(m==='recovery_not_found')return 'Não encontramos um Premium vinculado a esse código.';
  if(m==='premium_expired')return 'Esse Premium já venceu. Você pode ativar um novo período.';
  if(m==='premium_required')return 'O código de recuperação fica disponível para acessos Premium ativos.';
  return 'Confira sua internet e tente novamente.';
}
