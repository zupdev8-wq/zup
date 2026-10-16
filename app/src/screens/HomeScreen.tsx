import React,{useMemo,useRef,useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  View
} from 'react-native';
import Svg,{
  Defs,
  LinearGradient,
  Rect,
  Stop
} from 'react-native-svg';
import type {ViewToken} from 'react-native';

import type {
  Progress,
  GameMode,
  CategoryId,
  MicroLesson,
  TrackId
} from '../types';

import {
  effectiveStreak,
  level,
  questionMap
} from '../game';

import {buildFeed} from '../learning';
import {
  tracks,
  getCategory,
  getTrack
} from '../catalog';

import {companionById} from '../companions';
import {lessonPhoto} from '../photos';

import {
  Txt,
  Chip
} from '../components/UI';

import {Icon} from '../components/Icon';
import {C} from '../theme';


type Props={
  p:Progress;
  now:Date;

  topInset:number;
  bottomInset:number;

  start:(cat:CategoryId,mode?:GameMode)=>void;

  // Mantidos para compatibilidade com App.tsx.
  // Não exibimos mais o botão amarelo de retomar.
  resume:()=>void;

  profile:()=>void;
  companions:()=>void;
  explore:()=>void;

  read:(lesson:MicroLesson)=>void;
  save:(lessonId:string)=>void;
  open:(lessonId:string)=>void;
  microQuiz:(questionId:string)=>void;
};


function TinyStat({
  icon,
  value,
  label
}:{
  icon:'flame'|'star'|'bolt';
  value:string;
  label:string;
}){
  const iconColor=
    icon==='flame'
      ? C.orange
      : icon==='star'
        ? C.yellow
        : C.white;

  return (
    <View
      style={{
        minHeight:31,
        flexDirection:'row',
        alignItems:'center',
        gap:5,

        backgroundColor:'#050608C7',

        borderRadius:17,

        paddingHorizontal:9,
        paddingVertical:5,

        borderWidth:1,
        borderColor:'#FFFFFF24'
      }}
    >
      <Icon
        name={icon}
        size={14}
        color={iconColor}
      />

      <Txt
        size={11}
        bold
        color={C.white}
      >
        {value}
      </Txt>

      <Txt
        size={9}
        color="#E9EAEE"
      >
        {label}
      </Txt>
    </View>
  );
}


function FeedCard({
  lesson,
  photoUrl,
  p,
  height,
  topInset,
  bottomInset,
  onRead,
  onSave,
  onQuiz,
  now,
  index
}:{
  lesson:MicroLesson;
  photoUrl:string;

  p:Progress;

  height:number;
  topInset:number;
  bottomInset:number;

  onRead:()=>void;
  onSave:()=>void;
  onQuiz:()=>void;

  now:Date;
  index:number;
}){
  const category=getCategory(
    lesson.category
  );

  const saved=
    p.savedLessonIds.includes(
      lesson.id
    );

  const track=getTrack(
    lesson.tracks[0]??'geral'
  );

  const question=
    questionMap.get(
      lesson.quizQuestionId
    );


  /*
   * A cada cinco cards, um pode virar
   * uma pergunta-relâmpago.
   *
   * Se já respondeu essa questão,
   * ela não aparece novamente aqui.
   */
  const questionCard=
    Boolean(question) &&
    index%5===2 &&
    !p.completedIds.includes(
      lesson.quizQuestionId
    );


  const headline=
    questionCard
      ? question!.question
      : lesson.title;


  const summary=
    questionCard
      ? 'Teste sua intuição antes de ler. Depois, continue no quiz com cinco perguntas relacionadas.'
      : lesson.summary;


  /*
   * Títulos longos diminuem
   * automaticamente para não destruir
   * a composição visual.
   */
  const titleSize=
    headline.length>95
      ? 23
      : headline.length>80
        ? 25
        : headline.length>62
          ? 27
          : headline.length>42
            ? 30
            : 34;


  /*
   * ID individual do gradiente.
   * Isso evita conflito entre cards
   * renderizados simultaneamente
   * pela FlatList.
   */
  const shadeId=
    `feedShade-${index}`;


  return (
    <View
      style={{
        height,
        backgroundColor:C.ink,
        overflow:'hidden'
      }}
    >

      {/* FOTO FULLSCREEN */}

      <ImageBackground
        source={{
          uri:photoUrl
        }}
        resizeMode="cover"
        style={{
          position:'absolute',
          left:0,
          right:0,
          top:0,
          bottom:0
        }}
      >

        {/*
         * UM ÚNICO DEGRADÊ.
         *
         * Não existem mais duas Views
         * de 34% + 65%.
         *
         * Portanto não existe mais
         * a emenda/linha horizontal.
         */}

        <Svg
          width="100%"
          height="100%"
          style={{
            position:'absolute',
            left:0,
            right:0,
            top:0,
            bottom:0
          }}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient
              id={shadeId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {/* topo */}
              <Stop
                offset="0"
                stopColor="#000000"
                stopOpacity={0.38}
              />

              {/* área da fotografia */}
              <Stop
                offset="0.25"
                stopColor="#000000"
                stopOpacity={0.16}
              />

              <Stop
                offset="0.46"
                stopColor="#000000"
                stopOpacity={0.18}
              />

              {/* começa a escurecer */}
              <Stop
                offset="0.62"
                stopColor="#000000"
                stopOpacity={0.48}
              />

              {/* texto */}
              <Stop
                offset="0.79"
                stopColor="#000000"
                stopOpacity={0.72}
              />

              {/* rodapé */}
              <Stop
                offset="1"
                stopColor="#000000"
                stopOpacity={0.90}
              />
            </LinearGradient>
          </Defs>

          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${shadeId})`}
          />
        </Svg>

      </ImageBackground>


      {/* CONTEÚDO DO CARD */}

      <View
        style={{
          flex:1,

          paddingHorizontal:18,

          paddingTop:
            topInset+118,

          paddingBottom:
            bottomInset+12,

          justifyContent:'flex-end'
        }}
      >

        {/* TRILHA */}

        <View
          style={{
            alignSelf:'flex-start',
            marginBottom:10
          }}
        >
          <Chip
            color="#07080AC2"
          >
            <Txt
              size={11}
              bold
              color={C.white}
            >
              ZUP! • {track.shortLabel.toUpperCase()}
            </Txt>
          </Chip>
        </View>


        {/* XP / STREAK / ESTRELAS */}

        <View
          style={{
            flexDirection:'row',
            gap:7,
            flexWrap:'wrap',
            marginBottom:13
          }}
        >
          <TinyStat
            icon="flame"
            value={`${effectiveStreak(
              p,
              now
            )}`}
            label="dias"
          />

          <TinyStat
            icon="star"
            value={`${p.stars}`}
            label="estrelas"
          />

          <TinyStat
            icon="bolt"
            value={`${level(
              p.xp
            )}`}
            label="nível"
          />
        </View>


        {/* CATEGORIA */}

        <Txt
          size={11}
          bold
          color="#F7F7F8"
          style={{
            letterSpacing:1.35,

            textShadowColor:'#000000',

            textShadowOffset:{
              width:0,
              height:1
            },

            textShadowRadius:6
          }}
        >
          {
            questionCard
              ? 'PERGUNTA RELÂMPAGO'
              : category.label.toUpperCase()
          }
          {' · '}
          {lesson.minutes} MIN
        </Txt>


        {/* TÍTULO */}

        <Txt
          size={titleSize}
          bold
          color={C.white}
          style={{
            lineHeight:
              titleSize+6,

            marginTop:5,

            letterSpacing:-0.4,

            textShadowColor:
              '#000000F2',

            textShadowOffset:{
              width:0,
              height:2
            },

            textShadowRadius:12
          }}
        >
          {headline}
        </Txt>


        {/* RESUMO */}

        <View
          style={{
            backgroundColor:
              '#07080A8A',

            borderRadius:18,

            paddingHorizontal:14,
            paddingVertical:11,

            marginTop:11,

            borderWidth:1,
            borderColor:
              '#FFFFFF1C'
          }}
        >
          <Txt
            size={15}
            color="#F7F7F8"
            style={{
              lineHeight:21
            }}
            numberOfLines={3}
          >
            {summary}
          </Txt>
        </View>


        {/* AÇÕES */}

        <View
          style={{
            paddingTop:15,
            gap:9
          }}
        >

          {/* CTA PRINCIPAL */}

          <Pressable
            onPress={
              questionCard
                ? onQuiz
                : onRead
            }
            accessibilityRole="button"
            style={({pressed})=>({
              minHeight:56,

              borderRadius:22,

              backgroundColor:
                C.white,

              flexDirection:'row',

              alignItems:'center',
              justifyContent:'center',

              gap:9,

              opacity:
                pressed
                  ? 0.84
                  : 1,

              transform:[
                {
                  scale:
                    pressed
                      ? 0.985
                      : 1
                }
              ]
            })}
          >
            <Icon
              name={
                questionCard
                  ? 'brain'
                  : 'book'
              }
              size={20}
            />

            <Txt
              size={17}
              bold
            >
              {
                questionCard
                  ? 'Responder e ganhar XP'
                  : `Aprender em ${lesson.minutes} min`
              }
            </Txt>

            <Icon
              name="arrow"
              size={19}
            />
          </Pressable>


          {/* QUIZ + SALVAR */}

          <View
            style={{
              flexDirection:'row',
              gap:9
            }}
          >

            <Pressable
              onPress={
                questionCard
                  ? onRead
                  : onQuiz
              }
              accessibilityRole="button"
              style={({pressed})=>({
                flex:1,

                minHeight:49,

                borderRadius:19,

                backgroundColor:
                  pressed
                    ? '#191A20EE'
                    : '#090A0EDB',

                borderWidth:1,

                borderColor:
                  '#FFFFFF2C',

                alignItems:'center',
                justifyContent:'center',

                flexDirection:'row',

                gap:7
              })}
            >
              <Icon
                name={
                  questionCard
                    ? 'book'
                    : 'brain'
                }
                size={18}
                color={C.white}
              />

              <Txt
                size={14}
                bold
                color={C.white}
              >
                {
                  questionCard
                    ? 'Entender antes'
                    : 'Jogar quiz · 5'
                }
              </Txt>
            </Pressable>


            <Pressable
              onPress={
                onSave
              }
              accessibilityRole="button"
              accessibilityLabel={
                saved
                  ? 'Remover dos salvos'
                  : 'Salvar descoberta'
              }
              style={({pressed})=>({
                width:52,

                minHeight:49,

                borderRadius:19,

                backgroundColor:
                  saved
                    ? C.yellow
                    : '#FFFFFFF2',

                alignItems:'center',
                justifyContent:'center',

                opacity:
                  pressed
                    ? 0.78
                    : 1
              })}
            >
              <Icon
                name="bookmark"
                size={20}
                filled={saved}
              />
            </Pressable>

          </View>


          {/* INDICAÇÃO DE SWIPE */}

          <View
            style={{
              alignItems:'center',
              gap:1,
              paddingTop:1
            }}
          >
            <Icon
              name="chevron"
              size={14}
              color="#FFFFFFE8"
            />

            <Txt
              size={9}
              bold
              color="#FFFFFFE8"
            >
              DESLIZE PARA CIMA
            </Txt>
          </View>

        </View>

      </View>

    </View>
  );
}


export function HomeScreen({
  p,
  now,
  topInset,
  bottomInset,
  profile,
  read,
  save,
  open,
  microQuiz
}:Props){

  const [
    track,
    setTrack
  ]=useState<TrackId>(
    'geral'
  );


  const [
    height,
    setHeight
  ]=useState(
    620
  );


  /*
   * IMPORTANTE:
   *
   * openedLessonIds NÃO participa
   * das dependências.
   *
   * Assim simplesmente visualizar
   * um card não reordena o feed.
   */
  const feed=useMemo(
    ()=>{
      return buildFeed(
        p,
        track,
        now
      );
    },
    [
      p.learnedLessonIds,
      p.preferredTracks,
      track,
      now.toDateString()
    ]
  );


  /*
   * Evita repetir fotografia
   * imediatamente.
   *
   * Procura até oito variantes
   * do mesmo assunto.
   */
  const visualFeed=useMemo(
    ()=>{
      const recent:string[]=[];

      return feed.map(
        (
          lesson,
          index
        )=>{
          let photoUrl=
            lessonPhoto(
              lesson,
              index
            );


          for(
            let offset=1;

            offset<=8 &&
            recent.includes(
              photoUrl
            );

            offset++
          ){
            photoUrl=
              lessonPhoto(
                lesson,
                index+offset
              );
          }


          recent.push(
            photoUrl
          );


          /*
           * Não repetir entre
           * as últimas quatro imagens.
           */
          if(
            recent.length>4
          ){
            recent.shift();
          }


          return {
            lesson,
            photoUrl
          };
        }
      );
    },
    [feed]
  );


  /*
   * Registra somente que o card
   * foi visto.
   *
   * Isso NÃO deve reordenar
   * o feed.
   */
  const visible=useRef(
    ({
      viewableItems
    }:{
      viewableItems:
        ViewToken<{
          lesson:MicroLesson;
          photoUrl:string;
        }>[]
    })=>{
      const item=
        viewableItems
          .find(
            value=>
              value.isViewable
          )
          ?.item
          .lesson;


      if(
        item
      ){
        open(
          item.id
        );
      }
    }
  ).current;


  const viewability=
    useRef({
      itemVisiblePercentThreshold:72,
      minimumViewTime:300
    }).current;


  return (
    <View
      style={{
        flex:1,
        backgroundColor:C.ink
      }}
      onLayout={event=>{
        const nextHeight=
          Math.round(
            event
              .nativeEvent
              .layout
              .height
          );


        if(
          nextHeight>300 &&
          Math.abs(
            nextHeight-height
          )>2
        ){
          setHeight(
            nextHeight
          );
        }
      }}
    >

      {/* FILTROS SUPERIORES */}

      <View
        style={{
          position:'absolute',

          left:0,
          right:0,
          top:0,

          zIndex:5,

          paddingTop:
            topInset+8
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',

            paddingHorizontal:11
          }}
        >

          <ScrollView
            horizontal
            directionalLockEnabled
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={{
              gap:7,
              paddingRight:74
            }}
          >

            {
              tracks.map(
                item=>{
                  const active=
                    track===item.id;


                  return (
                    <Pressable
                      key={
                        item.id
                      }

                      onPress={
                        ()=>{
                          setTrack(
                            item.id
                          );
                        }
                      }

                      accessibilityRole="button"

                      accessibilityState={{
                        selected:
                          active
                      }}

                      style={({pressed})=>({
                        paddingHorizontal:14,

                        minHeight:39,

                        borderRadius:20,

                        backgroundColor:
                          active
                            ? '#08090CED'
                            : '#FFFFFFF0',

                        borderWidth:1,

                        borderColor:
                          active
                            ? '#FFFFFF30'
                            : '#00000014',

                        alignItems:'center',
                        justifyContent:'center',

                        opacity:
                          pressed
                            ? 0.78
                            : 1
                      })}
                    >
                      <Txt
                        size={11}
                        bold
                        color={
                          active
                            ? C.white
                            : C.ink
                        }
                      >
                        {
                          item.shortLabel
                        }
                      </Txt>
                    </Pressable>
                  );
                }
              )
            }

          </ScrollView>


          {/* PERFIL */}

          <Pressable
            onPress={
              profile
            }

            accessibilityRole="button"

            accessibilityLabel="Abrir perfil"

            style={({pressed})=>({
              position:'absolute',

              right:11,

              width:44,
              height:44,

              borderRadius:22,

              backgroundColor:
                companionById(
                  p.companionId
                ).pale,

              borderWidth:1.3,
              borderColor:C.ink,

              alignItems:'center',
              justifyContent:'center',

              opacity:
                pressed
                  ? 0.80
                  : 1
            })}
          >
            <Icon
              name="paw"
              size={19}
            />
          </Pressable>

        </View>
      </View>


      {/* FEED VERTICAL */}

      <FlatList
        data={
          visualFeed
        }

        keyExtractor={
          item=>
            item.lesson.id
        }

        pagingEnabled

        snapToInterval={
          height
        }

        snapToAlignment="start"

        decelerationRate="fast"

        disableIntervalMomentum

        bounces={
          false
        }

        showsVerticalScrollIndicator={
          false
        }

        onViewableItemsChanged={
          visible
        }

        viewabilityConfig={
          viewability
        }

        getItemLayout={
          (
            _,
            index
          )=>({
            length:
              height,

            offset:
              height*index,

            index
          })
        }

        initialNumToRender={
          3
        }

        maxToRenderPerBatch={
          4
        }

        windowSize={
          5
        }

        removeClippedSubviews

        renderItem={
          ({
            item,
            index
          })=>(
            <FeedCard
              lesson={
                item.lesson
              }

              photoUrl={
                item.photoUrl
              }

              p={
                p
              }

              height={
                height
              }

              topInset={
                topInset
              }

              bottomInset={
                bottomInset
              }

              now={
                now
              }

              index={
                index
              }

              onRead={
                ()=>{
                  read(
                    item.lesson
                  );
                }
              }

              onSave={
                ()=>{
                  save(
                    item.lesson.id
                  );
                }
              }

              onQuiz={
                ()=>{
                  microQuiz(
                    item
                      .lesson
                      .quizQuestionId
                  );
                }
              }
            />
          )
        }
      />

      {/*
       * NÃO EXISTE MAIS
       * O BOTÃO PLAY AMARELO AQUI.
       */}

    </View>
  );
}