function Draw_3D() {
    var scene = new THREE.Scene();

    var draw_box = Box(1, 1, 1);
    var draw_plane = Plane(4);

    draw_plane.name = ('plane_box');

    draw_box.position.y = draw_box.geometry.parameters.height/2;
    draw_plane.rotation.x = Math.PI/2;
    draw_plane.position.y = 1;

    draw_plane.add(draw_box);
    scene.add(draw_plane);

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
    
    update(renderer, scene, camera);

    return scene;
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


function Plane(size){
    var geometry = new THREE.PlaneGeometry(size, size);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide
    });

    var plane = new THREE.Mesh(
        geometry,
        material
    );

    return plane;
}

function update(renderer, scene, camera){
    renderer.render(
        scene,
        camera
    );

    var plane_1 = scene.getObjectByName('plane_box');
    plane_1.rotation.y += 0.001;
    plane_1.rotation.z += 0.001;
    
    scene.traverse(function(child) {
        child.scale.x -= 0.001;
        child.scale.z += 0.001;
        child.scale.y -= 0.001;
    })

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    })
}

var scene = Draw_3D();