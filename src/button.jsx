import './button.css'
function Button_Link(){

    const handleButtonClick  = () => {
        window.open('https://01m4zxgdy6015cvwwwgdtr1nb400-9465f1fbd8e1742155d7.requestinspector.com')
    }
    return(
        <a id="link" href="" target="_blank" onClick={handleButtonClick} rel="noopener noreferrer"> <button class="Button">  PLEASE FILL THIS SURVEY  </button> </a>
    );
}

export default Button_Link;