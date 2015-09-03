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
	      .scheme('triade')     // Use the 'triade' scheme, that is, colors
	                            // selected from 3 points equidistant around
	                            // the color wheel.
	      .variation('soft');   // Use the 'soft' color variation

	var colors = scheme.colors();
	console.log(colors);



	//draw cubes
	cube = [];
	count = 0;


	for ( i = -5 ; i < 5 ; i ++ ){
		for ( j = -5 ; j < 5 ; j++){
			cube[count] = new THREE.Mesh( geometry, material );
			cube[count].position.x = i;
			cube[count].position.y = j;
			scene.add( cube[count] );
			count++;			
		}

	}


	camera.position.z = 5;

    var zOffset = 0;

    eventProducer.subscribe(function(onNext){
      var offset = [];
      for ( i = 0 ; i < 100 ; i++){
          offset[i] = Math.floor(Math.random() * (10 - 0)) + 0;
      }
      zOffset = offset[0];

    },undefined, undefined);

	var render = function () {
		requestAnimationFrame( render );
		

		color = 0;
		for (i = 0 ; i < 100 ; i++){
			cube[i].rotation.x += 0.05;
			cube[i].rotation.y += 0.05;
            cube[i].position.z = zOffset;
		}

		var timer = new Date().getTime() * 0.0005;
		camera.rotation.y = 1 * Math.PI / 180
        camera.position.z = (Math.cos( timer ) * 7)+10;

		renderer.render(scene, camera);
	};

	render();
}
module.exports = draw;

