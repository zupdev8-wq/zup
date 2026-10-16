import React from 'react';
import {Pressable,Text,View} from 'react-native';
import {C} from '../theme';
export class ErrorBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(error:Error) {
    if(__DEV__)console.error('ZUP render error:',error.message);
  }
  render(){
    if(!this.state.failed)return this.props.children;
    return <View style={{flex:1,backgroundColor:C.cream,justifyContent:'center',padding:32,gap:18}}>
      <Text style={{fontSize:28,fontWeight:'800',color:C.ink}}>Vamos tentar de novo?</Text>
      <Text style={{fontSize:16,color:C.muted}}>A tela encontrou um problema. Reabrir não apaga seu progresso salvo.</Text>
      <Pressable accessibilityRole="button" onPress={()=>this.setState({failed:false})}
        style={{padding:18,borderRadius:18,backgroundColor:C.yellow}}>
        <Text style={{fontWeight:'800',textAlign:'center',color:C.ink}}>Reabrir o ZUP!</Text>
      </Pressable>
    </View>;
  }
}
