import Experience from "../Experience";
import Axios from "axios";

export default class HtmlIntegration {
    constructor() {
        this.experience = new Experience();
        this.size = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.setupStartPage();
    }

    setupStartPage() {
        this.MainBox = document.createElement('div');
        this.MainBox.style.height = `${window.screen.availHeight - 350}px`;
        this.MainBox.style.width = `${window.screen.availWidth}px`;
        this.MainBox.style.backgroundColor = 'Yellow';
        this.MainBox.style.opacity = 0.2
        this.MainBox.style.zIndex = 1;
        this.MainBox.style.position = 'relative';
        document.body.appendChild(this.MainBox);
        this.sethead();
        // this.login();
        this.signUp();
    }

    sethead() {
        this.heading = document.createElement('div');
        this.heading.innerHTML = "<h1>CODING RANGERS</h1>";
        this.MainBox.appendChild(this.heading);
    }

    signUp() {

        this.NameInputBox = document.createElement('input');
        this.ShopNameInputBox = document.createElement('input');
        this.ContactInputBox = document.createElement('input');

        this.NameInputBox.setAttribute('type', 'text');
        this.ShopNameInputBox.setAttribute('type', 'text');
        this.ContactInputBox.setAttribute('type', 'number');

        
        this.NameInputBox.style.height = `${3}vh`;
        this.NameInputBox.style.width = `${100}%`;
        
        this.ShopNameInputBox.style.height = `${3}vh`;
        this.ShopNameInputBox.style.width = `${100}%`;

        this.ContactInputBox.style.height = `${3}vh`;
        this.ContactInputBox.style.width = `${100}%`;
        
        //placeholder
        this.NameInputBox.setAttribute('placeholder', 'EnterName');
        this.ShopNameInputBox.setAttribute('placeholder', 'EnterShopName');
        this.ContactInputBox.setAttribute('placeholder', 'EnterContactNo');

        this.NameInputBox.addEventListener('click' , ()=>{
            this.NameInputBox.value = prompt('Enter Name:');
        })

        this.ShopNameInputBox.addEventListener('click' , ()=>{
            this.ShopNameInputBox.value = prompt('Enter Shop name :')
        })

        this.ContactInputBox.addEventListener('click' , ()=>{
            this.ContactInputBox.value = prompt('Enter Contact Info :');
        })

        this.inputWrapper = document.createElement('div');
        this.inputWrapper.style.height = `${50}vh`;
        this.inputWrapper.style.width = `${30}vw`;
        this.inputWrapper.style.display = 'block';
        this.inputWrapper.style.backgroundColor = 'red';
        this.inputWrapper.style.padding = `${40}px`

        this.inputWrapper.appendChild(this.NameInputBox);
        this.inputWrapper.appendChild(this.ShopNameInputBox);
        this.inputWrapper.appendChild(this.ContactInputBox);

        this.inputWrapper.style.marginLeft = `${35}%`;
        this.inputWrapper.style.paddingTop = `${10}%`;

        this.MainBox.appendChild(this.inputWrapper);

        this.SubmitButton = document.createElement('button');
        this.LoginButton = document.createElement('button');

        this.SubmitButton.style.width = `${60}px`;
        this.SubmitButton.style.height = `${20}px`;
        this.SubmitButton.style.alignItems = 'center';
        this.SubmitButton.innerHTML = "SIGNUP";

        this.LoginButton.style.width = `${60}px`;
        this.LoginButton.style.height = `${20}px`;
        this.LoginButton.style.alignItems = 'center';
        this.LoginButton.innerHTML = "LOGIN";

        this.inputWrapper.appendChild(this.SubmitButton);
        this.inputWrapper.appendChild(this.LoginButton);

        this.SubmitButton.addEventListener('click' , (e)=>{
            e.preventDefault();
            let w = 0  , x = 0  , y = 0 , z = 0 ;  
            navigator.geolocation.getCurrentPosition((position)=>{
                w  = position.coords.latitude ; 
                x  = position.coords.longitude ; 
                y = this.startLocation.accuracy  ; 
                z = this.startLocation.speed ; 
            })

            setTimeout(()=>{
                // this.nubervalue = parseInt()
                this.data = {
                    name : this.NameInputBox.value ,
                    shopName : this.ShopNameInputBox.value ,
                    location :  {w , x , y , z}, 
                    contact : parseInt(this.ContactInputBox.value)
                }

                console.log(this.data);

                Axios.post('http://159.65.236.57:5000/api/v1/users/register' , this.data).then((res)=>{
                    // console.log(res.data);
                    // console.log(window.localStorage)
                }).catch((err)=>{
                    console.log(err);
                })

            } , 5000)

        })

        this.LoginButton.addEventListener('click' , ()=>{
            this.inputWrapper.style.display = 'none';
            this.login();
        })
        
    }

    login(){

        this.ContactInputBox = document.createElement('input');

        this.ContactInputBox.setAttribute('type', 'number');

        this.ContactInputBox.style.height = `${3}vh`;
        this.ContactInputBox.style.width = `${100}%`;
        
        this.ContactInputBox.setAttribute('placeholder', 'EnterContactNo');

        this.ContactInputBox.addEventListener('click' , ()=>{
            this.ContactInputBox.value = prompt('Enter Contact Info :');
        })

        this.inputWrapper = document.createElement('div');
        this.inputWrapper.style.height = `${50}vh`;
        this.inputWrapper.style.width = `${30}vw`;
        this.inputWrapper.style.display = 'block';
        this.inputWrapper.style.backgroundColor = 'red';
        this.inputWrapper.style.padding = `${40}px`


        this.inputWrapper.appendChild(this.ContactInputBox);

        this.inputWrapper.style.marginLeft = `${35}%`;
        this.inputWrapper.style.paddingTop = `${10}%`;

        this.MainBox.appendChild(this.inputWrapper);

        this.SubmitButton = document.createElement('button');

        this.SubmitButton.style.width = `${60}px`;
        this.SubmitButton.style.height = `${20}px`;
        this.SubmitButton.style.alignItems = 'center';

        this.inputWrapper.appendChild(this.SubmitButton);

        this.SubmitButton.addEventListener('click' , (e)=>{
            Axios.get(`http://159.65.236.57:5000/api/v1/users/getid/${parseInt(this.ContactInputBox.value)}`).then((res)=>{
                console.log(res);
                localStorage.setItem('id' , res.data)
            }).catch((err)=>{
                console.log(err);
            })
        })
    }
};
