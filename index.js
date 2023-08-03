//variables
const searchbar=document.querySelector(".searchbar-container");
const profilecontainer=document.querySelector(".profile-container");
const root=document.documentElement.style;
const get=(param)=>document.getElementById(`${param}`);

const url="https://api.github.com/users/";
const noresults=get("no-results");
const btnmode=get("btn-mode");
const modetext=get("mode-text");
const modeicons=get("mode-icon");
const btnsubmit=get("submit");
const input=get("input");
const avatar=get("avatar");
const userName=get("name");
const user=get("user");
const date=get("date");
const months=["Jan","Fab","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const bio=get("bio");
const repos=get("repos");
const followers=get("followers");
const following=get("following");
const user_location=get("location");
const page=get("page");
const twitter=get("twitter");
const company=get("company");
let darkMode=false;

//event Listeners
btnsubmit.addEventListener("click",()=>{
    if(input.value!=""){
        getUserData(url+input.value);
    }
});

input.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        if(input.value!=""){
            getUserData(url+input.value);
        }
    }
},false);

input.addEventListener("input",()=>{
    noresults.style.display="none";
});

btnmode.addEventListener("click",()=>{
    if(darkMode==false) darkModeProperties();
    else lightModeProperties();
});

//functions

//api call
function getUserData(gitUlr){
    fetch(gitUlr).then((response)=>response.json())
    .then((dat)=>{
        console.log(data);
        updateProfile(data);
    }).catch((error)=>{throw error;});
}
//render
function updateProfile(data){
    if(data.message!="Not Found"){
        noresults.style.display="none";
        function checkNull(param1,param2){
            if(param1==""||param1==null){
                param2.style.opacity=0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }else return true;
        }
    avatar.src=`${data.avatar_url}`;
    userName.innerText=data.name==null?data.lonin:data.name;
    user.innerText=`@${data.login}`;
    user.href=`${data.html_url}`;
    datasegments=data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText=data.bio==null?"This profile has no  no bio":`${data.bio}`;
    repos.innerText=`${data.public_ropos}`;
    followers.innerText=`${data.followers}`;
    following.innerText=`${data.following}`;
    user_location.innerText=checkNull(data.location,user_location)?data.location:"Not Available";
    page.innerText=checkNull(data.blog,page)?data.blog:"#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
}
}


//swithc to darkMOde=activateDarkMode()
function darkModeProperties(){
    root.setProperty("--lm-bg","#141D2F");
    root.setProperty("--lm-bg-content","#1E2A47");
    root.setProperty("--lm-text","white");
    root.setProperty("--lm-text-alt","#white");
    root.setProperty("--lm-shadow-xl","rgba(70,88,109,0.15");
    modetext.innerText="Light";
    modeicons.src="./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg","brightness(1000%)");
    darkMode=true;
    console.log("darkmod changed to "+darkMode);
    localStorage.setItem("dark-mod".true);
    console.log("setting dark mode to false");

  console.log("setting dark mode to true");

}

//switch to lighmode=activatelighMode()
function lightModeProperties(){
    root.setProperty("--lm-bg","#f6f8ff")
    root.setProperty("--lm-bg-content","fefefe");
    root.setProperty("--lm-text","#4B6Aa9B");
    root.setProperty("--lm-text-alt","#2B3442");
    root.setProperty("--lm-shadow-xl","rgba(70,88,109,0.25)");
    modetext.innerText="Dark";
    modeicons.src="./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg","brightness(100%)");
    darkMode=false;

    console.log("darkMode changed to "+darkMode);
    localStorage.setItem("dark-mod",false);
    console.log("setting dark mode to false");
}

//INITIALISE UI
function initialise(){
    darkMode=false;
    const Value=localStorage.getItem("dark-mode");
    if(value==null){
        console.log("null ke andar h");
        localStorage.setItem("dark-mode",darkMode);
        lightModeProperties();
    }else if(value=="true"){
        console.log("true ke andar h");
        darkModeProperties();
    }else{
        console.log("false ke andar h");
        lightModeProperties();
    }
    //by default show ui
    getUserData(url+"vishalxbhargav");
}
initialise();