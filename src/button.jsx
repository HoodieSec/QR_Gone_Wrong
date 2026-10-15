function Button(){

    const handleButtonClick  = () => {
        window.open('https://google.com')
    }
    return(
        <button class="Button"> <a href="" target="_blank" rel="noopener noreferrer"> PLEASE FILL THIS SURVEY </a> </button>
    );
}

export default Button;