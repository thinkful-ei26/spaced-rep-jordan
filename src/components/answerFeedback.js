import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProtectedData } from '../actions/protected-data'; 

class AnswerFeedback extends Component {

    render() {
        
        const masteredWords = () => {
            this.props.dispatch(fetchProtectedData());
            if(this.props.initialMasteredWordsArray === null ) {
                return (<li>Loading mastered words...</li>)
            }
            if(this.props.initialMasteredWordsArray.length === 0) {
                return <li>TBD... keep going!</li> 
            }
            else if(this.props.initialMasteredWordsArray > 0 && this.props.initialMasteredWordsArray.length > this.props.masteredWordsArray ){
                const returnedWords = this.props.initialMasteredWordsArray.map(word => {
                     
                    return <span key={word}>{word}, </span>
                })
                return returnedWords
            }
            else { 
                const newMasteredWords = this.props.masteredWordsArray.map(word => {
                    return <span key={word}><b>{word}, </b></span>
                });
                return newMasteredWords
            }
        }

        const feedbackForAnswer = () => {

            let answer = this.props.currentAnswer
            let question = this.props.currentWord

            if(this.props.answeredCorrectly === true) { 
                return (
                <div>
                    <div> Nice job! Your answer for "{question}" was correct!</div>
                </div>
                ); 
            } else { 
                return (
                <div className="wrong-answer">
                    <p id="wrong-answer-response"> Your answer for "{question}"" was incorrect.</p><p id="correct-response">The correct answer is "{answer}". Enter the correct answer now and try again later. </p>   
                </div>
                )
            }
        }
        

        return (
            <div>
                <div className="feedback">
                    <label className="mastered-label" for="mastered-words">Mastered Words:</label>
                    <div className="mastered-words">
                        {masteredWords()}
                    </div>
                    <div className="user-feedback">
                    {feedbackForAnswer()}
                    </div>
                </div>
                
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("state:", state)
    return {
        answeredCorrectly:state.serverResponse.response.answeredCorrectly, 
        correctAnswer:state.serverResponse.response.correctAnswer || '', 
        masteredWordsArray:state.serverResponse.response.allMasteredWords || [], 
        initialMasteredWordsArray: state.auth.currentUser.masteredWords || [], 
        previousQuestion:state.serverResponse.response.currentWord || '',
        currentAnswer: state.protectedData.data.currentAnswer,
        currentWord: state.protectedData.data.currentWord,
    }
}

export default connect(mapStateToProps)(AnswerFeedback);