import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withStyles} from '@material-ui/styles';


const styles ={
    ColorBox:{
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position:"relative",
        cursor: "pointer",
        marginBottom:"-3.5px",
        "&:hover button":{
            opacity:1
        }
    },
    copyText:{
        color: props => 
        chroma(props.background).luminance() >= 0.7 ? "black":"white"
    },
    colorName:{
        color: props => 
        chroma(props.background).luminance() <= 0.08 ? "white":"black"
    },
    seeMore:{
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)":"white",
        background: "rgba(255,255,255,0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",  
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton:{
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)":"white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left:"50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration:"none"
    }
}

class ColorBox extends Component{

    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }   

    changeCopyState(){
        this.setState({copied:true}, () => {
            setTimeout(() => this.setState({copied:false}),1500)
        });
    }

    render(){
        const {name, background,paletteId,id, showLink, classes } = this.props;
        const {copied} = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.07;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                <div style={{background}} className={`copy-overlay ${copied && "show"}`} /> 
                <div className={`copy-msg ${copied && "show"}`} >
                    <h1>copied!</h1>
                    <p className={classes.copyText}>
                    {this.props.background}
                    </p>
                </div>
                <div  className="copy-container">
                    <div className="box-content">
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>copy</button>
                </div>
                {showLink && 
                <Link 
                to={`/palette/${paletteId}/${id}`} 
                onClick={e => e.stopPropagation()}
                >
                <span 
                className={classes.seeMore}
                >MORE</span>
                </Link>   
                }
            </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);