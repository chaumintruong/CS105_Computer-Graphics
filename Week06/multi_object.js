function Multi_Object(){
    var scene = new THREE.Scene();

    //Initialize Sphere
    var sphereGrid = SphereGrid(2, 15);
    scene.add(sphereGrid);

    //Background
    var path = 'plane';
    var format = '.jpg';
    var url = [
        path + format
    ];
    scene.background = new THREE.TextureLoader().load(url);

    //Camera
    var camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth/ window.innerHeight,
        0.1,
        1000
    );

    camera.position.x = 45;
    camera.position.y = 35;
    camera.position.z = 75;

    //Renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    //Document
    document.body.appendChild(renderer.domElement);

    //Controls camera
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);
}

function Sphere(r, w, h){
    var geometry = new THREE.SphereGeometry(r, w, h);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    var sphere = new THREE.Mesh(
        geometry,
        material
    );

    return sphere;
}

function SphereGrid(amount, separationMultiper){
    var group = new THREE.Group();

    for (var i=0; i<amount; i++){
        var obj = Sphere(5, 15 , 15);
        obj.position.x = i * separationMultiper;
        obj.position.y = obj.geometry.parameters.radius;
        group.add(obj);
        for (var j=0; j<amount; j++){
            var obj = Sphere(5, 15 , 15);
            obj.position.x = i * separationMultiper;
            obj.position.y = obj.geometry.parameters.radius;
            obj.position.z = j * separationMultiper;
            group.add(obj);
        }
    }

    group.position.x = -(separationMultiper * (amount-1))/2;
    group.position.z = -(separationMultiper * (amount-1))/2;

    return group;
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

Multi_Object()