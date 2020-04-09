window.addEventListener('DOMContentLoaded', function () {
    let canvas = $('.game');
    let engine = new BABYLON.Engine(canvas, true);

    let createScene = function () {
        // Create a basic BJS Scene object.
        let scene = new BABYLON.Scene(engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        let camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);

        // Target the camera to scene origin.
        camera.setTarget(BABYLON.Vector3.Zero());

        // Attach the camera to the canvas.
        camera.attachControl(canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        // let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 50, 50), scene);

        // Skybox
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./media/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;


        var material1 = new BABYLON.StandardMaterial("mat1", scene);
        material1.diffuseColor = new BABYLON.Color3(1, 1, 0);
        var box = BABYLON.Mesh.CreateBox("Box", 1.0, scene);
        box.material = material1;
        box.position = new BABYLON.Vector3(0, 0, 0);

        // Return the created scene.
        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
});