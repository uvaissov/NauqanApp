// import React, {Component} from 'react'
// import { StyleSheet, View} from 'react-native'
// import { Icon, Text, Button, ButtonGroup, CheckBox } from 'react-native-elements'
// import { connect } from 'react-redux'
// import { getWord, changeLevel, changeType } from '../../actions'
// import { BG_COLOR, MAIN_COLOR, WHITE } from '../../constants/global'
// import { WORD, PHRASE } from '../../wordTypes'
// import { Header } from '../../components'

// class Game extends Component {
//   _nextWord = () => {
//     this.props.getWord(this.props.level, this.props.type)
//   }    

//   _selectType = (type) => {
//     this.props.changeType(type)
//     //Если есть слово, то его необходимо заменить на соответвующий уровень сложности
//     if (this.props.word) {
//       this.props.getWord(this.props.level, type)
//     }
//   }

//   _selectLevel = (index) => {
//     this.props.changeLevel(index)
//     //Если есть слово, то его необходимо заменить на соответвующий уровень сложности
//     if (this.props.word) {
//       this.props.getWord(index, this.props.type)
//     }
//   }

//   render() {
//     const { navigation, commands, select_index, word, level, type, roundTime } = this.props
//     if (!word.word) {
//       console.log('Hello World!!')
//       this._nextWord()
//     }
//     return (
//       <View style={styles.container}>
//         <Header title="Игра" headerColor={MAIN_COLOR} onPress={() => navigation.openDrawer()} leftIcon='ios-menu' leftColor={WHITE} />
//         <View style={{ flex: 1}}>
//           { commands[select_index] &&
//           <View style={{ flex: 1}}>            
//             <View style={{ flex: 1}}>
//               <Text style={{textAlign: 'center'}}>Отгадывает команда1: <Text style={{ color: MAIN_COLOR, fontWeight: 'bold'}}> {commands[select_index] ? commands[select_index].name : ''} </Text> </Text>
//               <Text style={{textAlign: 'center', marginBottom: 10}}>Время раунда {roundTime} сек </Text>

//               <Text style={{textAlign: 'center', marginBottom: 2, fontWeight: 'bold'}}>Уровень сложности</Text>
//               <ButtonGroup containerStyle={{ height: 25 }} textStyle={{ fontSize: 10}} onPress={this._selectLevel} selectedIndex={level} buttons={['Простой', 'Средний', 'Сложный']} />
//               <Text style={{textAlign: 'center', marginBottom: 2, fontWeight: 'bold'}}>Слова/Фразы и текст</Text>
//               <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
//                 <CheckBox containerStyle={{ height: 35, justifyContent: 'center' }} textStyle={{ fontSize: 15}} size={15} onPress={() => this._selectType(WORD)} center title='Слова' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={type === WORD} />
//                 <CheckBox containerStyle={{ height: 35, justifyContent: 'center' }} textStyle={{ fontSize: 15}} size={15} onPress={() => this._selectType(PHRASE)} center title='Фразы' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={type === PHRASE} />
//               </View>
//             </View>
//             <View style={{ flex: 2, justifyContent: 'flex-start'}}>
//               <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                 <Icon raised name='refresh' color={MAIN_COLOR} onPress={this._nextWord} />
//               </View>
//               <View style={{flex: 4, justifyContent: 'flex-start', alignItems: 'center'}}>
//                 <Text style={{ fontSize: 35, opacity: 0.6, color: MAIN_COLOR, fontWeight: 'bold', marginLeft: 15, marginRight: 15, textAlign: 'center' }} >{word.word}</Text>
//                 <Text style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5}}>{word.desc}</Text>
//               </View>
//               <View style={{ height: 100, alignItems: 'center'}}>
//                 <Button title="Начать" buttonStyle={{ width: 150}} onPress={() => navigation.push('Round')} />
//               </View>
//             </View>
//           </View>
//           }
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     justifyContent: 'flex-start'
//   }
// })

// const mapStateToProps = state => {
//   return {
//     commands: state.setting.commands,
//     select_index: state.setting.select_index,
//     word: state.game.word,
//     level: state.game.level,
//     type: state.game.type,
//     roundTime: state.setting.roundTime
//   }
// }

// export default connect(mapStateToProps, { getWord, changeLevel, changeType })(Game)
