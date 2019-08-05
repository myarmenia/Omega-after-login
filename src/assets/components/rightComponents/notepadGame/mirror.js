import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
//import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

/*
const defaults = {
    markdown:'<!DOCTYPE>' ,
    javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};*/

class Code extends Component {
    constructor() {
        super();
        this.state = {
            code: '<!DOCTYPE>',
            readOnly: false,
            mode: 'markdown',

        }
    }

    /*  updateCode =(newCode)=> {
        this.setState({

            code: this.state.code +''+ newCode
        });
    }


   changeMode =(e)=> {
        let  mode = e.target.value;
        this.setState({
            mode: mode,
            code: defaults[mode]
        });
    }

    toggleReadOnly =() =>{
        this.setState({
            readOnly: !this.state.readOnly
        }, () => this.refs.editor.focus());
    }*/

componentWillMount(){
    this.setState({
        code1: this.state.code
    });
}



    componentWillReceiveProps (props)  {
            this.setState({
                code1: this.state.code1 +' '+  props.data,
                code : this.state.code1
            });
    }

    render () {
       const options = {
            lineNumbers: true,
            readOnly: this.state.readOnly,
            mode: this.state.mode
        };
        console.log( "render mirror")
              return (
            <div>
                <CodeMirror
                    value={this.state.code}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, metadata, value) => {
                    }}
                />

               {/* <Codemirror ref="editor" value={this.state.code} options={options} autoFocus={false} />
                {alert(this.state.code)}*/}
                {/*<div style={{ marginTop: 10 }}>
                    <select onChange={this.changeMode} value={this.state.mode}>
                        <option value="markdown">Markdown</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
                </div>*/}
            </div>
        );
    }

}

export default  Code;