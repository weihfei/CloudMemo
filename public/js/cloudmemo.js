//定义模块：CM
var app=angular.module("CM",["ionic"]);


//定义父控制器parents4
app.controller("parentsCtrl",["$scope","$timeout","$location",function($scope,$timeout,$location){


}]);


//配置路由词典
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){

    $stateProvider.state("start",{

       url:"/start",
        templateUrl:"start.html",
        controller:"startCtrl"

    }).state("login",
        {

        url:"/login",
        templateUrl:"login.html",
        controller:"loginCtrl"

    }).state("main",{

        url:"/main/:uid",
        templateUrl:"main.html",
        controller:"mainCtrl"

    }).state("register",{

        url:"/register",
        templateUrl:"register.html",
        controller:"registerCtrl"

    }).state("addmemo",{

        url:"/addmemo/:uid",
        templateUrl:"addMemo.html",
        controller:"addMemoCtrl"

    });

    $urlRouterProvider.otherwise("/login");

}]);


app.controller("startCtrl",["$scope","$timeout","$location",function($scope,$timeout,$location){


    $timeout(function(){

        $location.path("/login");

    },2000);


}]);

app.controller("loginCtrl",["$scope","$state",function($scope,$state){//用户登陆控制控制器

    $scope.errorShow=true;

    $scope.uName="";




    $scope.uLogin=function(){//获取用户输入的用户名和密码，把数据存入sessionstroage

        var nV=document.querySelector("[name='uname']").getAttribute("value");
        //console.log(nV);
        var pV=document.querySelector("[name='upwd']").getAttribute("value");
        //console.log(pV);



        if(nV===""||pV===""){

             $scope.errorMsg="用户名或密码不能为空";
            $scope.errorShow=false;



        }else{
            sessionStorage.setItem("uname",nV);
            sessionStorage.setItem("upwd",pV);
            $state.go("main",{uid:1});
        }

    }



}]);


app.controller("registerCtrl",["$scope","$timeout","$state",function($scope,$timeout,$state){//创建注册页控制器

var reg=new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,"g");//验证邮箱的正则表达式

$scope.errorShow=false;
    $scope.okShow=true;
    $scope.errorMsg="";
    $scope.register=function(){


        var emailValue=document.querySelector("[name='email']").getAttribute("value");//获取输入的邮箱
        var pwdlValue=document.querySelector("[name='upwd']").getAttribute("value");//获取输入的密码
        var rpwdValue=document.querySelector("[name='urpwd']").getAttribute("value");//获取再次输入的密码

        var e_result=emailValue.search(reg);//验证邮箱格式是否正确

        if(e_result===-1){

            $scope.errorShow=true;
            $scope.errorMsg="请输入正确的邮箱格式";



        }else if(pwdlValue===""||rpwdValue===""){//判断用户名或密码不能为空

            $scope.errorShow=true;
            $scope.errorMsg="用户名或密码不能为空";




        }else if(pwdlValue!=rpwdValue){//判断两次输入的密码是否一致

            $scope.errorShow=true;
            $scope.errorMsg="两次输入的密码不一致";

        }else{

            var reg_succ=document.getElementById("reg_succ");//显示注册成功的对话框
            reg_succ.style.height="200px";
            reg_succ.style.top="50px";
            reg_succ.style.opacity=1;

            $scope.okShow=false;

            $timeout(function(){

                $state.go("main",{uid:1});

            },3000);


        }



    }


}]);

app.controller("mainCtrl",["$scope","$http","$stateParams","$filter",function($scope,$http,$stateParams,$filter){

    $scope.isShow=true;

    $scope.randomIndex=function(){

        return Math.floor(Math.random()*7);

    }






    $scope.colorList=[

        {bgColor:"#FFBEBE",ftColor:"#ffffff"},
        {bgColor:"#FFE2BE",ftColor:"#C29257"},
        {bgColor:"#FFF9BE",ftColor:"#C9B77D"},
        {bgColor:"#D9FFBE",ftColor:"#A9D480"},
        {bgColor:"#BEFFE8",ftColor:"#86C1EA"},
        {bgColor:"#F1FAFF",ftColor:"#A9C2E9"},
        {bgColor:"#BFBEFF",ftColor:"#ffffff"}

    ];



    $scope.contentList=[

        {cid:1,title:"今天天气不错",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1345654567650},
        {cid:2,title:"我想吃饺子",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1445654567650},
        {cid:3,title:"今天心情不太好",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1545654567650},
        {cid:4,title:"空调太吹了，不太舒服",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1490565456765},
        {cid:5,title:"今天太热了，空气不好",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1334565456765},
        {cid:6,title:"还有10天就毕业了",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1348565456765},
        {cid:7,title:"明天要吃什么呢",content:"今天的天气真好呀，空气也不错，太阳当空照，花儿对我笑，小鸟说早早早，你为什么背上小书包",date:1364565456765},


    ];

    //js方法输出列表
    // function addList(){
    //     $scope.listId=document.getElementById("listMain");
    //     $scope.html="";
    //
    //     for(var i=0;i<$scope.contentList.length;i++){
    //
    //         var randomIndex=Math.floor(Math.random()*7);
    //         var time= $filter("date")($scope.contentList[i].date, "yyyy-MM-dd")
    //         //var time=`${$scope.contentList[i].date}`;
    //
    //         $scope.html+=`<a href="${$scope.contentList[i].cid}"> <div class="content_list" style="background-color: ${$scope.colorList[randomIndex].bgColor};color:${$scope.colorList[randomIndex].ftColor}">
    //
    //                      ${$scope.contentList[i].title}
    //
    //                      <div class="date_style">
    //
    //                       ${time}
    //                       </div>
    //                      </a>
    //                  </div>`;
    //
    //
    //     }
    //
    //
    //     $scope.listId.innerHTML=$scope.html;
    //
    //
    //
    // }



$scope.contentShow=function (){

    $scope.listId=document.getElementById("listMain");

    $scope.listId.addEventListener("click",function(e){

        var aList=document.querySelectorAll("a");

        if(e.target.nodeName==="A"){

            for(var i=0;i<aList.length;i++){

              aList[i].style.height="58px";


            }
            e.target.style.height="258px";

        }

        // if(e.target.nodeName==="A"&&e.target.getAttribute("class")==="content_list"){
        //
        //     e.target.setAttribute("class","active");
        //
        // }if(e.target.nodeName==="A"&&e.target.getAttribute("class")==="active"){
        //
        //     e.target.className="content_list"
        //
        // }


    });

};

$scope.onSwipeLeft=function($index){

    // var dTarget=document.querySelectorAll(`[data-index=${$index}]`);
    // dTarget[0].setAttribute("ng-show","isShow");
    // dTarget[1].setAttribute("ng-show","isShow");

    var aa=document.querySelector("div[class='date_style']");
    console.log(aa);


    $scope.isShow=false;


}

}]);

app.controller("addMemoCtrl",["$scope","$http","$ionicPopup","$timeout","$state",function($scope,$http,$ionicPopup,$timeout,$state){


    $scope.memoTitle="";
    $scope.memoContent="";

    $scope.errorShow=true;
    $scope.isShow=false;

    //document.getElementsByClassName("addMemo_enter")[0].style.left="0px";
    //document.getElementsByClassName("addMemo_enter")[0].style.opacity=1;

    $scope.saveMemo=function(){

        var titleValue=document.querySelector("[ng-model='memoTitle']").getAttribute("value");
        var contentValue=document.querySelector("[ng-model='memoContent']").getAttribute("value");

        var titleLength=getByteLen(titleValue);//获取输入字符的数量

        if(titleValue===""||contentValue===""){

            $scope.errorShow=false;
            $scope.errorMsg="标题或内容不能为空";

        }else if(titleLength>20){

            $scope.errorShow=false;
            $scope.errorMsg="标题太长，请限定在10字以内";


        }else{

            $scope.feedBack="添加成功！";

            document.querySelector(".list").style.transform="perspective(500px) rotateX(90deg)";
            document.querySelector(".list").style.opacity=0;
            //document.querySelector(".list").style.transform="translateY(30%)";
            document.querySelector(".alertShow").style.top="5rem";
            $timeout(function () {//2s后返回main页面

                $state.go("main",{uid:1});

            },2000);

        }

        console.log(titleLength);


    }

    function getByteLen(val) {//判断输入的是汉子还是字母，汉子返回两个字符，字母返回一个字符
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    }





}]);