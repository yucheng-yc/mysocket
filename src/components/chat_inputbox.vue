<template>
    <div class="inputbox">
        <textarea class="textinput"></textarea>
        <span class="btn">发送</span>
    </div>
</template>

<style  scoped>
.inputbox {
    position:absolute;
    bottom: 0;
    width: 100%;
    height:144px;
    background-color: white;
}
.textinput {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.btn {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 60px;
    padding: .2rem 1rem;
    height: 25px;
    background-color: rgb(245, 245, 245);
    text-align: center;
    border-radius: 5px;
}
.btn:hover {
    background-color: rgb(18, 150, 17);
}
</style>