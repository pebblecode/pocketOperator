function init(){

}

function draw(eventProducer){
	console.log('draw');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	//controls = new THREE.OrbitControls( camera );
  //controls.addEventListener( 'change', render );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( .5, .5, .5 );
	console.log(geometry);
	material = new THREE.MeshBasicMaterial({
	    color: 0x4169e1,
	    wireframe: true
	});


	var scheme = new ColorScheme;
	scheme.from_hue(21)         // Start the scheme 
	      .scheme('tetrade')     // Use the 'triade' scheme, that is, colors
	                            // selected from 3 points equidistant around
	                            // the color wheel.
	      .variation('soft');   // Use the 'soft' color variation

	var colors = scheme.colors();
	console.log(colors);



	//draw cubes
	cube = [];
	count = 0;

	for ( i = -50 ; i < 50 ; i ++ ){
		for ( j = -50 ; j < 50 ; j++){
			cube[count] = new THREE.Mesh( geometry, material );
			cube[count].position.x = i;
			cube[count].position.y = j;
			cube[count].position.z = Math.floor(Math.random() * (200 - 0)) + 0;
			scene.add( cube[count] );
			count++;			
		}

	}


	camera.position.z = 5;

    var zOffset = [];
    var offset = [];

    for ( i = 0 ; i < 10000 ; i++){
        zOffset[i] = Math.floor(Math.random() * (200 - 0)) + 0;
    }

    eventProducer.subscribe(function(onNext){
        //cube[count].position.z = zOffset[count];
        var color = Math.floor(Math.random() * (14 - 0) + 0);
        cube[0].material.color.setHex( '0x'+colors[color]);	      	

    },undefined, undefined);

	var render = function () {
		requestAnimationFrame( render );
		
		
		var spacingMultiplier =  (Math.random() * (1.1 - 1)) + 1;
		var colorChangeDeterminer = Math.floor(Math.random() * (100 - 0)) + 0;


		count = 0;
		for (i = -50 ; i < 50 ; i++){
			for(j = -50; j < 50 ; j++){
				//cube[count].position.x = i*spacingMultiplier;
				//cube[count].position.y = j*spacingMultiplier;
				cube[count].rotation.x += 0.05;
				cube[count].rotation.y += 0.05;
        

        count++;			
			}
		}

		var timer = new Date().getTime() * 0.0005;
		camera.rotation.y = camera.rotation.y+.01;
		camera.rotation.x = camera.rotation.x-.01;
    camera.position.z = (Math.cos( timer ) * 60)+60;

		renderer.render(scene, camera);
	};

	render();
}
module.exports = draw;

