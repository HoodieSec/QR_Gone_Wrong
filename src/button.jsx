import './button.css'
function Button_Link(){

    const handleButtonClick  = () => {
        window.open('https://google.com')
    }
    return(
        <a id="link" href="" target="_blank" onClick={handleButtonClick} rel="noopener noreferrer"> <button class="Button">  PLEASE FILL THIS SURVEY  </button> </a>
    );
}

export default Button_Link;