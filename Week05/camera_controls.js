function Draw_3D() {

    var scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0xffffff, 0.01);

    var draw_box = Box(15, 15, 15);
    var draw_sphere = Sphere(10, 15, 15);

    draw_box.name = ('box')
    draw_sphere.name = ('sphere')

    draw_sphere.position.x = 15;
    draw_box.position.x = -15;

    scene.add(draw_box);
    scene.add(draw_sphere);

    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/ window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 50;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 1000;

    animation(renderer, scene, camera);
}

function Sphere(r, w, h) {
    var geometry = new THREE.SphereGeometry(r, w, h);
    
    var material = new THREE.MeshBasicMaterial({
        wireframe: true, 
        color: 0xff9999
    });

    var sphere = new THREE.Mesh(
        geometry,
        material
    );

    return sphere;
}

function Box(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);

    var material = new THREE.MeshBasicMaterial({
         color: 0x00ffff, 
         wireframe: true
    });

    var box = new THREE.Mesh(
        geometry,
        material
    );

    return box;
}

function animation(renderer, scene, camera) {
    renderer.render(
        scene,
        camera
    );
    
    var box = scene.getObjectByName('box');
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    var sphere = scene.getObjectByName('sphere');
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    scene.traverse(function(child) {
        child.scale.x -= 0.0001;
        child.scale.z += 0.0001;
        child.scale.y -= 0.0001;
    })

    requestAnimationFrame(function() {
        animation(renderer, scene, camera);
    })
}


Draw_3D();