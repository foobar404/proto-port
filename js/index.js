const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const log = console.log

log("hi friend")


function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
        rect.top >= -100 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + 100 || html.clientHeight + 100) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
}


//nav
$$(".nav_link").forEach(link => {
    link.onclick = e => {
        $$(".nav_link").forEach(x => {
            x.classList.remove("active_link")
        })
        e.currentTarget.classList.add("active_link")
    }
})

setInterval(() => {
    let elms = ["#main_section", "#headline_section", "#project_section", "#about_section"]
    elms.forEach(elm => {
        if (isInViewport($(elm))) {
            $$(".nav_link").forEach(x => {
                x.classList.remove("active_link")
            })

            $(`#${$(elm).id}_link`).classList.add("active_link")
        }
    })
}, 300);




//setup main section 
let left_height = (document.body.clientHeight / 2)
let left_percent = (left_height / document.body.clientWidth) * 100
$("#main_section #left").style.width = `${left_percent}%`
$("#main_section #right").style.width = `${100 - left_percent}%`

$$(".face").forEach(elm => {
    elm.style.transform = getComputedStyle(elm).transform + ` translateZ(${(left_height / 2) - 2}px)`
})

$("#avatar").onmousemove = (e) => {
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

//headline
$$("video").forEach(video => {

    video.onclick = e => {
        if (e.currentTarget.paused) e.currentTarget.play()
        else e.currentTarget.pause()

        $$("video").forEach(video => {
            video.parentNode.classList.toggle("hide")
        })
        e.currentTarget.parentNode.classList.remove("hide")
        e.currentTarget.parentNode.classList.toggle("full")

        e.currentTarget.parentNode.querySelector(".poster").classList.toggle("side_poster")
    }
})

//projects

$$(".project").forEach(p => {
    p.style.height = getComputedStyle(p).width
})

$$(".skill").forEach(skill => {
    skill.onclick = e => {
        $$(".skill").forEach(x => {
            x.style.color = ""
        })

        let skill_name = e.currentTarget.innerText;
        e.currentTarget.style.color = "#0089ff"

        $$(".project").forEach(project => {
            project.classList.add("hide")
        })

        $$(`.${skill_name}`).forEach(i => {
            i.classList.remove("hide")
        })
    }
})



//about
let hue = 0
$("#pose").onmousemove = e => {
    hue += 5
    $("#pose").style.filter = `hue-rotate(${hue}deg)`
}

$("#pose").onmouseleave = e => {
    hue = 0
    $("#pose").style.filter = `hue-rotate(${hue}deg)`
}
