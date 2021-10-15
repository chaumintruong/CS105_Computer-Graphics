function Draw_3D() {
    var scene = new THREE.Scene();

    var draw_box = Box(1, 1, 1);
    var draw_sphere = Sphere(1, 1, 1);

    scene.add(draw_box);
    scene.add(draw_sphere);


    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/ window.innerHeight,
        0.1,
        1000
    );

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(renderer.domElement);

    renderer.render(
        scene,
        camera
    );
}

function Box(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);

    var material = new THREE.MeshBasicMaterial({
         color: 0x00ffff
    });

    var box = new THREE.Mesh(
        geometry,
        material
    );

    return box;
}




Draw_3D();