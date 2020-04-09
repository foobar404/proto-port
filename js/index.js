const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const log = console.log

log("hi friend")


//navbar
$("nav").onclick = e => {
    $("#fill #buttons").classList.toggle("flex");
}


//setup main section 
let left_height = (window.innerHeight / 2)
let left_percent = (left_height / window.innerWidth) * 100
$("#main_section #left").style.width = `${left_percent}%`
$("#main_section #right").style.width = `${100 - left_percent}%`

$$(".face").forEach(elm => {
    elm.style.transform = getComputedStyle(elm).transform + ` translateZ(${(left_height / 2) - 2}px)`
})

$("#avatar").onmousemove = (e) => {
    log(e)
    let transform = `rotate3d(0, 1, 0, ${(e.x / 10) - 30}deg) rotate3d(1, 0, 0, ${-(e.y / 10) + 30}deg)`
    $("#avatar").style.transform = transform
}

$("#avatar").onmouseleave = (e) => {
    $("#avatar").style.transition = ".5s cubic-bezier(0, 0.74, 0.58, 1)"
    $("#avatar").style.transform = ""
    setTimeout(() => {
        $("#avatar").style.transition = ""
    }, 500)
}

//healine
$$("video").forEach(video => {
    video.onmouseenter = e => {
        e.currentTarget.play()
    }
    video.onmouseleave = e => {
        e.currentTarget.pause()
    }
    video.onclick = e => {
        $$("video").forEach(video => {
            video.parentNode.classList.toggle("hide")
        })
        e.currentTarget.parentNode.classList.remove("hide")
        e.currentTarget.parentNode.classList.toggle("full")
    }
})
