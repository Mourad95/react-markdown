import React from 'react';
import { render } from 'react-dom';
import './style/css/bootstrap.min.css';
import './index.css';
import marked from 'marked';

//JS perso
import { sampleText } from './sampleText'; //Constante contenant du text

class App extends React.Component{

    state={
        text:sampleText
    };

    componentWillMount=()=>{
        const localStorageText = localStorage.getItem('text') 
        if(localStorageText){ 
            this.setState({ text: localStorageText}); // local storage permet de conserver les valeurs ici il garde le text màj
        }
    }

    componentWillUpdate=(nextProps, nextState)=>{
        localStorage.setItem('text',nextState.text)
    }

    editText=(event)=>{ //Fonction qui va permettre de changer le text
        const newText = event.target.value
        this.setState({ text : newText  })
    };

    renderText=(htmlText)=>{ //mise en forme html de sampleText
        const renderText = marked(htmlText, {sanitize:true}) //sanitize empêche d'insérer des balises html
        return { __html: renderText}; // objet html pour plus de décurité
    }

    

    render(){
        return(
            <div className="container">
                <div className="row">
                    
                    <div className="col-sm-6">
                        <textarea 
                        className="form-control" 
                        value={this.state.text}  
                        rows="35"
                        onChange={(newEvent)=> this.editText(newEvent)} //fonction qui permet le changement du text
                        >
                        
                        </textarea>
                    </div>
                    
                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>                  
                    </div>
                </div>
            </div>
        )
    }
};

render(
    <App/>,
    document.getElementById('root')
);