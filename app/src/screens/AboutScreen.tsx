import React from 'react';
import {Txt,Page,Card,Button,Chip} from '../components/UI';
import {Icon} from '../components/Icon';
import {openHTTPS,privacyURL,supportURL} from '../links';
import {questions} from '../questions';
import {microLessons} from '../learning';
import {categories} from '../catalog';
import {C} from '../theme';
export function AboutScreen(){return <Page contentContainerStyle={{paddingBottom:42,gap:16}}>
  <Txt size={35} bold accessibilityRole="header">ZUP!</Txt><Txt size={16}>Um jogo de conhecimento para trocar scroll automático por repertório.</Txt><Chip color={C.lemon}>VERSÃO 1.6.0</Chip>
  <Card><Icon name="brain" color={C.success} size={30}/><Txt size={21} bold>Como o ZUP funciona</Txt><Txt size={15}>O “Pra você” mistura Brasil, geopolítica, ENEM, concursos, faculdade, ciências, livros, religiões e entretenimento. Cada microaula explica rápido e pode abrir um jogo de até 5 perguntas relacionadas.</Txt><Txt size={15}>Perguntas respondidas saem da rotação normal. Revisão é uma ação separada, usada quando você quiser reforçar erros ou quando a repetição espaçada indicar que vale rever.</Txt></Card>
  <Card><Icon name="book" color="#376A9E" size={30}/><Txt size={21} bold>Conteúdo e fontes</Txt><Txt size={15}>O catálogo desta versão reúne {questions.length} perguntas em {categories.length} matérias e {microLessons.length} cartões de microaprendizado. Há trilhas para estados brasileiros, fronteiras, vida urbana, pensamento crítico, teologia e religiões, cursos de faculdade, concursos e entretenimento.</Txt><Txt size={15}>Temas sensíveis ou de atualidades devem ser tratados com data, contexto e fontes. O ZUP diferencia conhecimento permanente de conteúdo que precisa de atualização editorial.</Txt>{Boolean(supportURL)&&<Button title="Sugerir correção" variant="outline" icon="external" onPress={()=>void openHTTPS(supportURL)}/>}</Card>
  <Card><Icon name="shield" color={C.success} size={30}/><Txt size={21} bold>Seu progresso e seus dados</Txt><Txt size={15}>Apelido, companheiro, preferências, biblioteca, XP, estrelas e progresso ficam salvos localmente nesta versão. Uma cópia anterior ajuda a recuperar falhas de gravação.</Txt><Txt size={15}>Apagar os dados locais remove esse progresso. A sincronização entre aparelhos exige ativação do backend.</Txt>{Boolean(privacyURL)&&<Button title="Política de privacidade" variant="outline" icon="external" onPress={()=>void openHTTPS(privacyURL)}/>}</Card>
  <Card color={C.blueLight}><Icon name="paw" size={30}/><Txt bold>Companheiros do jogo</Txt><Txt size={15}>Lumi, Jaci, Zavi e Nox são mascotes originais do ZUP!. Eles evoluem com XP e servem como recompensa visual; não alteram a dificuldade nem dão vantagem acadêmica.</Txt></Card>
</Page>;}
