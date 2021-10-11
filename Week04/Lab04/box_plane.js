var scene = new THREE.Scene();

var draw_box = Box(1, 1, 1);
var draw_plane = Plane(4, 4);

draw_plane.rotation.x = 90;

scene.add(draw_box);
scene.add(draw_plane);

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    1,
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
            
function Box(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({
         color: (0, 255, 255)
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

function Plane(w, h){
    var geometry = new THREE.PlaneGeometry(w, h);
    var material = new THREE.MeshBasicMaterial({
        color: (255, 255, 0)
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}
