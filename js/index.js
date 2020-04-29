const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const log = console.log

log(`%cThere once was a man from Tibet,
Who couldn't find a cigarette.
So he smoked all his socks,
and got chicken-pocks,
and had to go to the vet.`, "color:#222;font-size:22px;font-family:cursive;")


if (window.innerWidth > window.innerHeight) {

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
    function run_main_section() {
        let left_height = ($("#desktop").clientHeight / 2)
        let left_percent = (left_height / $("#desktop").clientWidth) * 100
        $("#main_section #left").style.width = `${left_percent}%`
        $("#main_section #right").style.width = `${100 - left_percent}%`
    }

    run_main_section()

    //headline
    function toggle_video(video) {
        if (video.paused) video.play()
        else video.pause()

        $$("video").forEach(video => {
            video.parentNode.classList.toggle("hide")
        })
        video.parentNode.classList.remove("hide")
        video.parentNode.classList.toggle("full")

        video.parentNode.querySelector(".poster").classList.toggle("side_poster")
    }

    $$("video").forEach(video => {

        video.onclick = e => {
            toggle_video(e.currentTarget)
        }
    })

    $$(".poster").forEach(poster => {
        poster.onclick = e => {
            let video = e.currentTarget.nextElementSibling;
            toggle_video(video)
        }
    })

    //projects

    $$(".project").forEach(project => {
        project.onclick = e => {
            e.currentTarget.querySelector(".project_about").classList.toggle("show")
        }
    })

    $$(".skill").forEach(skill => {
        skill.onclick = e => {
            //highlight active skill 
            $$(".skill").forEach(x => {
                x.style.color = ""
            })
            e.currentTarget.style.color = "#0089ff"

            let skill_name = e.currentTarget.innerText.toLowerCase();

            if (skill_name == "all") {
                $$(".project").forEach(project => {
                    project.classList.remove("hide")
                })
                return
            }

            $$(".project").forEach(project => {
                project.classList.add("hide")
            })

            $$(`.${skill_name}`).forEach(i => {
                i.classList.remove("hide")
            })
        }
    })


    //extra
    window.addEventListener('resize', function () {
        run_main_section()
    });

}
