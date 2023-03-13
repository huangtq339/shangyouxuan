//需要将所有的DOM元素对象和相关资源全部加载完毕后，再来实现的事件函数
window.onload = function(){
    //声明一个记录点击的缩略图下标，实现缩略图、小图和大图显示图片一致
    let bigimgIndex = 0

    navPathDataBind()
    //路径导航的数据渲染
    function navPathDataBind(){
        const navPath = document.querySelector("#wrapper #content .contentMain #navPath ")
        const path = goodData.path
        for (let i = 0; i < path.length; i++) {
            if(path[i].title){
                const aNode = document.createElement("a")
                aNode.innerText = path[i].title
                aNode.href = path[i].url
                navPath.appendChild(aNode)
            }
            if(path[i].url){
            const iNode = document.createElement("i") 
            iNode.innerText = "/"
            navPath.appendChild(iNode)
            }         
    }
    }

    //放大镜，蒙版移入移出效果
    bigClassBind()
    function bigClassBind(){
        const imagessrc =  goodData.imagessrc
        //1.获取小图框元素
        const smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        //获取leftTop元素
        const leftTop = document.querySelector("#wrapper #content .contentMain #center #left #leftTop")
        //2.设置移入事件
        smallPic.onmouseenter = function(){    
            //3.创建蒙版元素
            const maskDiv = document.createElement('div')
            maskDiv.className = "mask"
            //4.创建大图框元素
            const BigPic = document.createElement('div')
            BigPic.id = "bigPic"
            //5.创建大图片元素
            const BigImg = document.createElement("img")
            BigImg.src = imagessrc[bigimgIndex].b
            //6.大图框追加大图片
            BigPic.appendChild(BigImg)
            //7.小图框追加蒙版元素
            smallPic.appendChild(maskDiv)
            //8.leftTop元素追加大图框
            leftTop.appendChild(BigPic)

            //设置移动事件
            smallPic.onmousemove = function(event){
            //event.clientX :鼠标点距离浏览器左侧x轴的值
            //smallPic.getBoundingClientRect().left：小图框元素距离浏览器左侧可视left值
            //offsetWidth：元素的占位宽
            let left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth/2
            let top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight/2
            if(left < 0){
                left = 0
            }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                left =  smallPic.clientWidth - maskDiv.offsetWidth
            }
            
            if(top< 0){
                top = 0
            }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                top = smallPic.clientHeight - maskDiv.offsetHeight
            }
            maskDiv.style.left = left + "px"
            maskDiv.style.top = top + "px"  

            //移动的比例关系：蒙版元素可移动的距离 / 大图片可移动的距离
            const scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)
            BigImg.style.left = - left / scale + "px"
            BigImg.style.top = - top / scale + "px"
            }

            //设置移出事件
            smallPic.onmouseleave = function(){
                smallPic.removeChild(maskDiv)
                leftTop.removeChild(BigPic)
            }
        }
    }

    //动态渲染放大镜缩略图的数据
    thunbnailData()
    function thunbnailData(){
        const ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul")
        const imagessrc =  goodData.imagessrc
        for (let i = 0; i < imagessrc.length; i++) {
            const li = document.createElement("li")
            const newImg = document.createElement("img")
            newImg.src = imagessrc[i].s
            li.appendChild(newImg)
            ul.appendChild(li)
        }
    }

    //缩略图点击切换事件
    thumbnailClick()
    function thumbnailClick(){
        const liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li ")
        //缩略图小图
        const smallPic_img = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic img")
        const imagessrc =  goodData.imagessrc
        //缩略图小图路径需要默认和数据中第一张图片是一样的
        smallPic_img.src = imagessrc[0].s 
        //循环点击li标签
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function(){
                bigimgIndex = i

                //变换小图路径
                smallPic_img.src = imagessrc[i].s
            }
            
        }
    }

    //点击缩略图左右箭头的效果
    thunbnailLeftRightClick()
    function thunbnailLeftRightClick(){
        //获取左右箭头元素
        const prev = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom a.prev ")
        const next = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom a.next ")
        //实际上是ul进行移动
        const ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul ")
        const liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li")

        //起点位置
        let start = 0
        //步长
        let step = (liNodes[0].offsetWidth + 20)
        //总体可移动的距离 = ul宽度 - div宽度 = （图片总数 - div中显示的数量） * （li的宽度 + 20）
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

        prev.onclick = function(){
            start -=step
            if(start<0){
                start = 0
            }
            ul.style.left = -start + "px"
        }
        next.onclick = function(){
            start += step
            if(start>endPosition){
                start = endPosition
            }
            ul.style.left = -start + "px"
        }
    }

    //商品详情数据的动态渲染
    rightTopData()
    function rightTopData(){
        const rightTop = document.querySelector("#wrapper #content .contentMain #center #right .rightTop")
        const goodsDetail = goodData.goodsDetail
        let s = `
        <h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceWrap">
            <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
                <p>
                    <span>累计评价</span>
                    <span>${goodsDetail.evaluateNum}</span>
                </p>
            </div>
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>${goodsDetail.promoteSales.content}</span>
                </p>
            </div>
        </div>
        <div class="support">
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
            <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
            <span>配&nbsp;送&nbsp;至</span>
            <p>${goodsDetail.address}</p>
        </div>`
        rightTop.innerHTML = s
    }

    //商品参数数据的动态渲染
    rightButtomData()
    function rightButtomData(){
        const chooseWrap = document.querySelector("#wrapper #content .contentMain #center #right .rightBottom .chooseWrap")
        const crumbData = goodData.goodsDetail.crumbData
        for (let i = 0; i < crumbData.length; i++) {
            const dlNode = document.createElement("dl")
            const dtNode = document.createElement("dt")
            dtNode.innerText = crumbData[i].title
            dlNode.appendChild(dtNode)
            for (let j = 0; j < crumbData[i].data.length; j++) {
                const ddNode = document.createElement("dd")
                ddNode.innerText = crumbData[i].data[j].type
                ddNode.setAttribute("price",crumbData[i].data[j].changePrice)
                dlNode.appendChild(ddNode)
            }
            chooseWrap.appendChild(dlNode)
        }
    }

    //点击商品元素的排他效果
    clickddBind()
    function clickddBind(){
        const dlNode = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl ")
        const choose = document.querySelector("#wrapper #content .contentMain #center #right .rightBottom .choose")
        const arr = new Array(dlNode.length) //创建存放结果对应下标的数组
        arr.fill(0) //数组填空默认值
        for (let k = 0; k < dlNode.length; k++) {
            const ddNode =  dlNode[k].querySelectorAll("dd")
            for (let i = 0; i < ddNode.length; i++) {
                ddNode[i].onclick =function(){
                    //点击前清空之前选择的结果
                    choose.innerText = ""
                    for (let j = 0; j < ddNode.length; j++) {
                        ddNode[j].style.color = "#666"
                    }
                    this.style.color = "red"

                    //点击哪一个dd元素产生一个新的dd选择对象
                    // arr[k] = this.innerText
                    arr[k] = this
                    changePriceBind(arr) //给价格函数变动传入arr数组
                    arr.forEach((value,index) => {
                        //主要为真，即非0，该位置有结果，就创建mark标签
                        if(value){
                            const markDiv = document.createElement("div")
                            markDiv.className = "mark"
                            markDiv.innerHTML = value.innerText
                            const aNode = document.createElement('a')
                            aNode.innerText = "X"
                            aNode.setAttribute("index",index) //给a设置一个index属性，方便以后获取索引位置，进行删除
                            markDiv.appendChild(aNode)
                            choose.appendChild(markDiv)
                        }
                    });
                    //获取所有a标签元素，并且循环发生点击事件，删除某个选择的结果
                    const aNodes = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .choose .mark a")
                    for (let n = 0; n < aNodes.length; n++) {
                        aNodes[n].onclick = function(){
                            let idx = this.getAttribute('index')
                            //恢复数组中对应下标的值
                            arr[idx] = 0
                            //找到对应下标的那个dl行所有dd元素
                            const ddlist = dlNode[idx].querySelectorAll("dd")
                            //遍历所有的dd元素，文字颜色该为灰色
                            for (let m = 0; m < ddlist.length; m++) {
                                ddlist[m].style.color = "#666"
                            }
                            //默认第一个dd颜色为红色
                            ddlist[0].style.color = "red"

                            //删除对应下标的mark标记
                            choose.removeChild(this.parentNode)

                            //调用价格函数，删除时减去相应价格
                            changePriceBind(arr)
                        }
                    }
                } 
            } 
        } 
    }

    //价格变动函数
    function changePriceBind(arr){
        /* 
        1.获取价格的标签元素
        2.给每个dd标签身上添加价格属性 
        3.遍历arr数组，将dd元素新价格和初始价格相加
        4.计算之后结果重新渲染到p标签
        */
       //源价格标签元素
        let oldPrice = document.querySelector("#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p")
        //取出默认价格
        let price = goodData.goodsDetail.price
        for (let i = 0; i < arr.length; i++) {
            if(arr[i]){
                let changeprice = Number(arr[i].getAttribute("price"))
                price += changeprice
            }
        }
        oldPrice.innerText = price

        let leftprice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p")
        leftprice.innerText = "￥" + price

        let newprice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i ")
        newprice.innerText = "￥" + price
    }

    //选择搭配中间区域复选框选中套餐价格变动效果
    chooseprice()
    function chooseprice(){
        //获取复选框元素
        const ipts = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div input")
        //获取套餐价
        let newprice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i ")
        //获取搭配的原始价格
        let leftprice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p")
        // console.log(leftprice)
        //获取搭配价格
        let matchprice = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li div span")
        //获取搭配选择后的价格
        let prices = document.querySelector("#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p")
        //遍历这些复选框
        for (let i = 0; i < ipts.length; i++) {
            ipts[i].onclick = function(){
                let oldprice = Number(leftprice.innerText.slice(1))
                //遍历其中选中的部分
                for (let j = 0; j < ipts.length; j++) {
                    if(ipts[j].checked){
                        oldprice += Number(matchprice[j].innerText)
                    } 
                }
                // if(ipts[i].checked){
                    // oldprice += Number(matchprice[i].innerText)
                // }
                newprice.innerText = "￥" + oldprice
                prices.innerText = oldprice            
            }
        }
    }

    //封装选项卡公共函数
    //被点击的元素，被切换的元素
    function Tab(tabBtns,tabConts){
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].onclick = function(){
                //循环遍历，让所有切换的元素不显示,点击的元素不为active
                for (let j = 0; j < tabConts.length; j++) {
                    tabBtns[j].className = ""
                    tabConts[j].className = ""
                }
                //让当前被点击的元素显示与active
                this.className = 'active'
                tabConts[i].className = 'active'

            }
            
        }
    }

    //点击左侧选项卡
    lefttab()
    function lefttab(){
        const h4s = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4")
        const divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent>div")
        Tab(h4s,divs)
    }

    rightTab()
    //点击右侧选项卡
    function rightTab(){
        const lis = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li")
        const divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div")
        Tab(lis,divs)
    }

    //右边侧边栏的点击效果
    rightAsideBind()
    function rightAsideBind(){
        const btns = document.querySelector("#wrapper .rightAside .btns")
        const rightAside = document.querySelector("#wrapper .rightAside") //侧边栏
        //记录初始状态,关闭
        let flag = true
        btns.onclick = function(){
            if(flag){ //展开
                btns.className = "btns btnsClose"
                rightAside.className = "rightAside asideClose"
            }else{
                btns.className = "btns btnsOpen"
                rightAside.className = "rightAside asideOpen"
            }
            flag = !flag
        }
    }
}