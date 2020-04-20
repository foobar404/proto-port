window.addEventListener('DOMContentLoaded', function () {
    let canvas = $('.game');
    let engine = new BABYLON.Engine(canvas, true);

    let createScene = function () {
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = BABYLON.Color3.Black;
        let camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 50, -200));
        camera.attachControl(canvas, false);

        // let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0, 0), scene);
        // light.intensity = 0.85;
        // light.specular = new BABYLON.Color3(0.95, 0.95, 0.81);

        let pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(0, 0, 0), scene);
        pl.diffuse = new BABYLON.Color3(1, 1, 1);
        pl.intensity = 1.0;

        let nb = 20000//160000;    		// nb of triangles
        let fact = 100; 			// cube size

        // custom position function for SPS creation
        let myPositionFunction = function (particle, i, s) {
            particle.position.x = (Math.random() - 0.5) * fact;
            particle.position.y = (Math.random() - 0.5) * fact;
            particle.position.z = (Math.random() - 0.5) * fact;
            particle.rotation.x = Math.random() * 3.15;
            particle.rotation.y = Math.random() * 3.15;
            particle.rotation.z = Math.random() * 1.5;
            particle.color = new BABYLON.Color4(particle.position.x / fact + 0.5, particle.position.y / fact + 0.5, particle.position.z / fact + 0.5, 1.0);
        };

        // model : triangle
        let triangle = BABYLON.MeshBuilder.CreateDisc("t", { tessellation: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);

        // SPS creation : Immutable {updatable: false}
        let SPS = new BABYLON.SolidParticleSystem('SPS', scene, { updatable: false });
        SPS.addShape(triangle, nb, { positionFunction: myPositionFunction });
        let mesh = SPS.buildMesh();


        // dispose the model
        triangle.dispose();

        // SPS mesh animation
        scene.registerBeforeRender(function () {
            pl.position = camera.position;
            SPS.mesh.rotation.y += 0.01;
            //SPS.mesh.rotation.z += 0.005;
        });

        return scene;
    }

    let scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
});


