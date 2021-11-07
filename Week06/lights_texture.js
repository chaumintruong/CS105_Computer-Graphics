function Draw3D(){
    var scene = new THREE.Scene();
    var gui = new dat.GUI();
    var type = 'standard';

    //Initialize Sphere
    var sphere = Sphere(5, 15, 15, type, 0x787878);
    sphere.position.y = sphere.geometry.parameters.radius;
    scene.add(sphere);

    //Initialize Plane
    var plane = Plane(100, 60, type, 0x787878);
    plane.rotation.x = Math.PI/2;
    scene.add(plane);

    //Initialize Octahedron
    // var octahedron_point = Octahedron(0.5, 5);
    // var octahedron_spot_left = Octahedron(0.5, 5);
    // var octahedron_spot_right = Octahedron(0.5, 5);
    var octahedron_directional = Octahedron(0.5, 5);

    //Point Light
    // var pointLight = getPointLight(5);
    // pointLight.position.y = 15;
    // pointLight.intensity = 2;
    // pointLight.add(octahedron_point);
    // scene.add(pointLight);
    //GUI
    // var folder = gui.addFolder('pointLight')
    // folder.add(pointLight, 'intensity', 0, 10);
    // folder.add(pointLight.position, 'x', -30, 30);
    // folder.add(pointLight.position, 'y', -30, 30);
    // folder.add(pointLight.position, 'z', -30, 30);
    // folder.open();

    //SpotLight
    //Left
    // var spotLight_left = getSpotLight(5);
    // spotLight_left.position.x = 5;
    // spotLight_left.position.y = 15;
    // spotLight_left.position.z = 8;
    // spotLight_left.intensity = 2;
    // spotLight_left.add(octahedron_spot_left);
    // scene.add(spotLight_left);
    //Right
    // var spotLight_right = getSpotLight(5);
    // spotLight_right.position.x = -5;
    // spotLight_right.position.y = 15;
    // spotLight_right.position.z = -8;
    // spotLight_right.intensity = 2;
    // spotLight_right.add(octahedron_spot_right);
    // scene.add(spotLight_right);
    //GUI
    // var folder = gui.addFolder('spotLight');
    //Left
    // folder.add(spotLight_left, 'intensity', 0, 10);
    // folder.add(spotLight_left.position, 'x', -30, 30);
    // folder.add(spotLight_left.position, 'y', -30, 30);
    // folder.add(spotLight_left.position, 'z', -30, 30);
    // folder.add(spotLight_left, 'penumbra', 0, 1);
    //Right
    // folder.add(spotLight_right, 'intensity', 0, 10);
    // folder.add(spotLight_right.position, 'x', -30, 30);
    // folder.add(spotLight_right.position, 'y', -30, 30);
    // folder.add(spotLight_right.position, 'z', -30, 30);
    // folder.add(spotLight_right, 'penumbra', 0, 1);
    // folder.open();

    //DirectionalLight
    var directionalLight = getDirectionalLight(5);
    directionalLight.position.x = 10;
    directionalLight.position.y = 15;
    directionalLight.position.z = 5;
    directionalLight.intensity = 2;
    directionalLight.add(octahedron_directional);
    scene.add(directionalLight);
    //GUI
    var folder = gui.addFolder('directionalLight');
    folder.add(directionalLight, 'intensity', 0, 10);
    folder.add(directionalLight.position, 'x', -30, 30);
    folder.add(directionalLight.position, 'y', -30, 30);
    folder.add(directionalLight.position, 'z', -30, 30);
    folder.open();

    //AmbientLight
    // var ambientLight = getAmbientLight(1);
    // scene.add(ambientLight);

    //RectAreaLight
    // var rectareaLight = getRectAreaLight(1, 10, 10);
    // scene.add(rectareaLight);

    //TextureMap
    var loader = new THREE.TextureLoader();
    //For Plane
    plane.material.map = loader.load('plane.jpg');
    plane.material.bumpMap = loader.load('plane.jpg');
    plane.material.metalness = 0.1;
    plane.material.roughness = 0.7;
    //For Sphere
    sphere.material.map = loader.load('sphere.jpg');
    sphere.material.bumpMap = loader.load('sphere.jpg');
    sphere.material.metalness = 0.1;
    sphere.material.roughness = 0.7;
    sphere.material.bumpScale = 1;
    var maps = ['map', 'bumpMap'];
    maps.forEach(function(mapName) {
        var texture = sphere.material[mapName];
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1); 
    });
    
    //Materials
    var Folder = gui.addFolder('materials');
    Folder.add(plane.material, 'metalness', 0, 1);
    Folder.add(sphere.material, 'metalness', 0, 1);
    Folder.add(plane.material, 'roughness', 0, 1);
    Folder.add(sphere.material, 'roughness', 0, 1);
    Folder.open();

    //Camera
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/ window.innerHeight,
        0.1,
        1000
    );

    camera.position.x = 10;
    camera.position.y = 20;
    camera.position.z = 50;

    //Renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
    renderer.setClearColor(0x787878);
    renderer.shadowMap.enabled = true;

    //Document
    document.body.appendChild(renderer.domElement);

    //Controls camera
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

}

function Plane(w, h, type, color){
    var geometry = new THREE.PlaneGeometry(w, h);

    var material = getMaterial(type, color);

    var plane = new THREE.Mesh(
        geometry,
        material
    );

    plane.receiveShadow = true;

    return plane;
}

function Sphere(r, w, h, type, color){
    var geometry = new THREE.SphereGeometry(r, w, h);

    var material = getMaterial(type, color);

    var sphere = new THREE.Mesh(
        geometry,
        material
    );
    
    sphere.castShadow = true;

    return sphere
}

function Octahedron(r, d){
    var geometry = new THREE.OctahedronGeometry(r, d);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    var octahedron = new THREE.Mesh(
        geometry,
        material
    );

    return octahedron;
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);

    light.castShadow = true;

    return light;
}

function getSpotLight(intensity) {
    var light = new THREE.SpotLight(0xffffff, intensity);

    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
}

function getDirectionalLight(intensity) {
    var light = new THREE.DirectionalLight(0xffffff, intensity);
    light.castShadow = true;

    light.shadow.camera.left = -10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;

    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    
    return light;
}

function getAmbientLight(intensity) {
    var light = new THREE.AmbientLight(0x5f5014, intensity);
    return light;
}

function getRectAreaLight(intensity, w, h){
    var light = new THREE.RectAreaLight(0x0a3838, intensity, w, h);
    return light;
}

function getMaterial(type, color) {
    var selectedMaterial;
    var materialOptions = {
        color: color === undefined ? 0xffffff : color,
        side: THREE.DoubleSide,
    }
    switch (type) {
        case 'basic':
            selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
            break;
        case 'lambert':
            selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
            break;
        case 'phong':
            selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
            break;
        default:
            selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
            break;
    }
    return selectedMaterial;
}

function update(renderer, scene, camera, controls){
    renderer.render(
        scene,
        camera
    );

    controls.minDistance = 1;
    controls.maxDistance = 1000;

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    })
}
Draw3D()