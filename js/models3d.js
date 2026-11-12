/**
 * 3D Interactive Three.js Models for Trilok Industries
 * Features:
 * 1. High-Fidelity Hero Backhoe Loader Rig:
 *    - Corrected wheel orientation (turned 90° so axle runs across Z, rolling along X).
 *    - Backhoe proportions: Large rear industrial tires, smaller front steerable tires.
 *    - Deep chevron lug treads, deep-dish yellow steel rims, planetary hubcaps, chrome lug nuts.
 *    - Modern cabin with tinted glass, roll cage, operator seat, steering console, roof light bars, beacon.
 *    - Front loader arms with dual hydraulic rams and heavy scoop bucket with 5 excavator teeth.
 *    - Rear articulated backhoe boom, dipper arm, and bucket with stabilizer legs.
 *    - Exhaust stack with rain-cap, side fuel tanks, non-slip access ladders, radiator grille.
 * 2. Dark Section Heavy Crawler Excavator with animated hydraulics & golden particle sparks.
 * 3. 8 High-Fidelity, Recognizable Procedural 3D Machinery Models for the Catalog Cards:
 *    - 1. Heavy Jaw Crusher with flywheels, hopper, and toggle frame.
 *    - 2. Overhead Hoist & Crane Trolley with wire rope drum, motor & forged hook.
 *    - 3. Vibrating Screen (2YK) in authentic industrial blue with coil springs & eccentric drive.
 *    - 4. Coke-Oven Door Assembly with latching bars, sealing knife-edge & gas pipe.
 *    - 5. Heavy Belt Conveyor & Drive Drum with troughing idlers & motor gearbox.
 *    - 6. 16' Precision Centre Lathe with 4-jaw chuck, carriage, toolpost & tailstock.
 *    - 7. Self-Supporting ESP Chimney Stack with spiral strakes, caged ladder & duct.
 *    - 8. Pig Casting Machine Chain Assembly with articulated links, pins & rollers.
 */

// Shared industrial materials generator
function createIndustrialMaterials() {
  return {
    yellowBody: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.35,
      metalness: 0.25
    }),
    darkChassis: new THREE.MeshStandardMaterial({
      color: 0x181e26,
      roughness: 0.65,
      metalness: 0.8
    }),
    darkSteel: new THREE.MeshStandardMaterial({
      color: 0x242b35,
      roughness: 0.5,
      metalness: 0.85
    }),
    chromeHydraulic: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.08,
      metalness: 0.96
    }),
    tireRubber: new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.92,
      metalness: 0.08
    }),
    treadRubber: new THREE.MeshStandardMaterial({
      color: 0x1c1e22,
      roughness: 0.88,
      metalness: 0.05
    }),
    screenBlue: new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.4,
      metalness: 0.3
    }),
    glassCabin: new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.6,
      transparent: true,
      opacity: 0.7
    }),
    warningAmber: new THREE.MeshBasicMaterial({
      color: 0xfbbf24
    }),
    ledHeadlight: new THREE.MeshBasicMaterial({
      color: 0xffffff
    }),
    taillightRed: new THREE.MeshBasicMaterial({
      color: 0xef4444
    }),
    shadowMat: new THREE.MeshBasicMaterial({
      color: 0x0a0d12,
      transparent: true,
      opacity: 0.35
    })
  };
}

// Helper to build realistic wheels with deep lug treads & yellow rims
function buildDetailedWheel(radius, width, isRear, mats) {
  const wheelGroup = new THREE.Group();

  // 1. Tire Main Body (Cylinder rotated around X by 90 deg so axle is along Z axis)
  const tireGeom = new THREE.CylinderGeometry(radius, radius, width, 28);
  tireGeom.rotateX(Math.PI / 2);
  const tire = new THREE.Mesh(tireGeom, mats.tireRubber);
  wheelGroup.add(tire);

  // 2. Deep Industrial Lug Treads around the circumference
  const lugCount = isRear ? 18 : 14;
  const lugWidth = width * 0.45;
  const lugThickness = radius * 0.12;

  for (let i = 0; i < lugCount; i++) {
    const angle = (i / lugCount) * Math.PI * 2;
    const lugGeom = new THREE.BoxGeometry(radius * 0.22, lugThickness, lugWidth);
    
    // Left chevron tread
    const leftLug = new THREE.Mesh(lugGeom, mats.treadRubber);
    leftLug.position.set(
      Math.cos(angle) * (radius + lugThickness * 0.3),
      Math.sin(angle) * (radius + lugThickness * 0.3),
      width * 0.22
    );
    leftLug.rotation.z = angle + THREE.MathUtils.degToRad(18);
    wheelGroup.add(leftLug);

    // Right chevron tread
    const rightLug = new THREE.Mesh(lugGeom, mats.treadRubber);
    rightLug.position.set(
      Math.cos(angle) * (radius + lugThickness * 0.3),
      Math.sin(angle) * (radius + lugThickness * 0.3),
      -width * 0.22
    );
    rightLug.rotation.z = angle - THREE.MathUtils.degToRad(18);
    wheelGroup.add(rightLug);
  }

  // 3. Deep-Dish Yellow Rim
  const rimRadius = radius * 0.62;
  const rimGeom = new THREE.CylinderGeometry(rimRadius, rimRadius, width * 1.02, 24);
  rimGeom.rotateX(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeom, mats.yellowBody);
  wheelGroup.add(rim);

  // 4. Center Planetary Axle Hubcap (Dark steel)
  const hubRadius = rimRadius * 0.45;
  const hubGeom = new THREE.CylinderGeometry(hubRadius, hubRadius, width * 1.08, 16);
  hubGeom.rotateX(Math.PI / 2);
  const hub = new THREE.Mesh(hubGeom, mats.darkSteel);
  wheelGroup.add(hub);

  // 5. Chrome / Steel Lug Nuts
  const nutCount = 6;
  const nutDist = rimRadius * 0.72;
  for (let n = 0; n < nutCount; n++) {
    const nutAngle = (n / nutCount) * Math.PI * 2;
    const nutGeom = new THREE.CylinderGeometry(0.04, 0.04, width * 1.06, 6);
    nutGeom.rotateX(Math.PI / 2);
    const nut = new THREE.Mesh(nutGeom, mats.chromeHydraulic);
    nut.position.set(
      Math.cos(nutAngle) * nutDist,
      Math.sin(nutAngle) * nutDist,
      0
    );
    wheelGroup.add(nut);
  }

  return wheelGroup;
}

// =========================================================================
// 1. REFINED HERO 3D BACKHOE LOADER & EXCAVATOR RIG
// =========================================================================
function initHero3D() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight || 520;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(13.5, 7.5, 14.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Realistic Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
  sunLight.position.set(22, 32, 20);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);

  const skyFill = new THREE.DirectionalLight(0xbae6fd, 0.65);
  skyFill.position.set(-18, 14, -14);
  scene.add(skyFill);

  const mats = createIndustrialMaterials();
  const machineGroup = new THREE.Group();

  // A. Heavy Chassis & Belly Pan
  const chassisGeom = new THREE.BoxGeometry(6.6, 1.2, 2.5);
  const chassis = new THREE.Mesh(chassisGeom, mats.darkChassis);
  chassis.position.set(0.2, 1.6, 0);
  chassis.castShadow = true;
  machineGroup.add(chassis);

  // Fuel Tank & Hydraulic Oil Tank
  const tankGeom = new THREE.BoxGeometry(1.6, 0.8, 0.6);
  const fuelTank = new THREE.Mesh(tankGeom, mats.darkSteel);
  fuelTank.position.set(-0.2, 1.5, 1.5);
  const hydroTank = new THREE.Mesh(tankGeom, mats.darkSteel);
  hydroTank.position.set(-0.2, 1.5, -1.5);
  machineGroup.add(fuelTank, hydroTank);

  // Non-Slip Diamond Steps
  const stepGeom = new THREE.BoxGeometry(0.9, 0.08, 0.4);
  const leftStep = new THREE.Mesh(stepGeom, mats.darkSteel); leftStep.position.set(0.6, 0.95, 1.6);
  const rightStep = new THREE.Mesh(stepGeom, mats.darkSteel); rightStep.position.set(0.6, 0.95, -1.6);
  machineGroup.add(leftStep, rightStep);

  // B. Engine Hood & Radiator Grille
  const hoodGeom = new THREE.BoxGeometry(2.8, 1.4, 2.2);
  const hood = new THREE.Mesh(hoodGeom, mats.yellowBody);
  hood.position.set(1.9, 2.3, 0);
  hood.castShadow = true;
  machineGroup.add(hood);

  const grillGeom = new THREE.BoxGeometry(0.1, 1.1, 1.8);
  const grill = new THREE.Mesh(grillGeom, mats.darkSteel);
  grill.position.set(3.32, 2.25, 0);
  machineGroup.add(grill);

  const lightGeom = new THREE.BoxGeometry(0.12, 0.35, 0.45);
  const leftLight = new THREE.Mesh(lightGeom, mats.ledHeadlight); leftLight.position.set(3.32, 2.5, 0.75);
  const rightLight = new THREE.Mesh(lightGeom, mats.ledHeadlight); rightLight.position.set(3.32, 2.5, -0.75);
  machineGroup.add(leftLight, rightLight);

  // Exhaust Stack & Rain Cap
  const pipeGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.8, 16);
  const exhaustPipe = new THREE.Mesh(pipeGeom, mats.darkSteel);
  exhaustPipe.position.set(1.0, 3.6, 0.95);
  const capGeom = new THREE.ConeGeometry(0.18, 0.25, 12);
  const cap = new THREE.Mesh(capGeom, mats.darkSteel);
  cap.position.set(1.0, 4.5, 0.95);
  cap.rotation.z = Math.PI / 4;
  machineGroup.add(exhaustPipe, cap);

  // Air Pre-Cleaner
  const intakeGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.5, 12);
  const intake = new THREE.Mesh(intakeGeom, mats.darkSteel);
  intake.position.set(1.0, 3.4, -0.95);
  machineGroup.add(intake);

  // C. Operator Cabin & Interior
  const cabWidth = 2.4;
  const cabHeight = 2.6;
  const cabLength = 2.2;

  const cabGlassGeom = new THREE.BoxGeometry(cabLength, cabHeight, cabWidth);
  const cabGlass = new THREE.Mesh(cabGlassGeom, mats.glassCabin);
  cabGlass.position.set(-0.4, 3.4, 0);
  machineGroup.add(cabGlass);

  const pillarGeom = new THREE.CylinderGeometry(0.06, 0.06, cabHeight, 8);
  const p1 = new THREE.Mesh(pillarGeom, mats.darkChassis); p1.position.set(0.65, 3.4, 1.15);
  const p2 = new THREE.Mesh(pillarGeom, mats.darkChassis); p2.position.set(-1.45, 3.4, 1.15);
  const p3 = new THREE.Mesh(pillarGeom, mats.darkChassis); p3.position.set(0.65, 3.4, -1.15);
  const p4 = new THREE.Mesh(pillarGeom, mats.darkChassis); p4.position.set(-1.45, 3.4, -1.15);
  machineGroup.add(p1, p2, p3, p4);

  const roofGeom = new THREE.BoxGeometry(cabLength * 1.15, 0.28, cabWidth * 1.15);
  const roof = new THREE.Mesh(roofGeom, mats.yellowBody);
  roof.position.set(-0.4, 4.75, 0);
  roof.castShadow = true;
  machineGroup.add(roof);

  const beaconGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.35, 12);
  const beacon = new THREE.Mesh(beaconGeom, mats.warningAmber);
  beacon.position.set(-0.4, 5.0, 0);
  machineGroup.add(beacon);

  const podGeom = new THREE.BoxGeometry(0.18, 0.16, 0.35);
  const podFrontLeft = new THREE.Mesh(podGeom, mats.ledHeadlight); podFrontLeft.position.set(0.85, 4.75, 0.8);
  const podFrontRight = new THREE.Mesh(podGeom, mats.ledHeadlight); podFrontRight.position.set(0.85, 4.75, -0.8);
  const podRearLeft = new THREE.Mesh(podGeom, mats.taillightRed); podRearLeft.position.set(-1.65, 4.75, 0.8);
  const podRearRight = new THREE.Mesh(podGeom, mats.taillightRed); podRearRight.position.set(-1.65, 4.75, -0.8);
  machineGroup.add(podFrontLeft, podFrontRight, podRearLeft, podRearRight);

  // Interior seat & steering
  const seatGeom = new THREE.BoxGeometry(0.7, 0.9, 0.7);
  const seat = new THREE.Mesh(seatGeom, mats.darkSteel); seat.position.set(-0.4, 2.7, 0);
  const wheelCol = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), mats.darkSteel);
  wheelCol.position.set(0.3, 2.9, 0);
  wheelCol.rotation.z = -Math.PI / 4;
  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 8, 16), mats.darkSteel);
  steerWheel.position.set(0.1, 3.2, 0);
  steerWheel.rotation.y = Math.PI / 2;
  machineGroup.add(seat, wheelCol, steerWheel);

  // D. 4 Wheels with 90° Turn
  const rearLeftWheel = buildDetailedWheel(1.45, 0.95, true, mats);
  rearLeftWheel.position.set(-1.9, 1.45, 1.95);
  const rearRightWheel = buildDetailedWheel(1.45, 0.95, true, mats);
  rearRightWheel.position.set(-1.9, 1.45, -1.95);

  const frontLeftWheel = buildDetailedWheel(1.05, 0.75, false, mats);
  frontLeftWheel.position.set(2.4, 1.05, 1.75);
  frontLeftWheel.rotation.y = THREE.MathUtils.degToRad(8);

  const frontRightWheel = buildDetailedWheel(1.05, 0.75, false, mats);
  frontRightWheel.position.set(2.4, 1.05, -1.75);
  frontRightWheel.rotation.y = THREE.MathUtils.degToRad(8);

  machineGroup.add(rearLeftWheel, rearRightWheel, frontLeftWheel, frontRightWheel);

  // Axles
  const rearAxleGeom = new THREE.CylinderGeometry(0.18, 0.18, 3.9, 16);
  rearAxleGeom.rotateX(Math.PI / 2);
  const rearAxle = new THREE.Mesh(rearAxleGeom, mats.darkChassis); rearAxle.position.set(-1.9, 1.45, 0);
  const frontAxleGeom = new THREE.CylinderGeometry(0.14, 0.14, 3.5, 16);
  frontAxleGeom.rotateX(Math.PI / 2);
  const frontAxle = new THREE.Mesh(frontAxleGeom, mats.darkChassis); frontAxle.position.set(2.4, 1.05, 0);
  machineGroup.add(rearAxle, frontAxle);

  // E. Front Loader Boom & Scoop Bucket
  const frontBoomGroup = new THREE.Group();
  frontBoomGroup.position.set(2.6, 1.8, 0);

  const armGeom = new THREE.BoxGeometry(3.6, 0.35, 0.3);
  const leftArm = new THREE.Mesh(armGeom, mats.yellowBody); leftArm.position.set(1.5, 0.7, 1.25); leftArm.rotation.z = THREE.MathUtils.degToRad(16); leftArm.castShadow = true;
  const rightArm = new THREE.Mesh(armGeom, mats.yellowBody); rightArm.position.set(1.5, 0.7, -1.25); rightArm.rotation.z = THREE.MathUtils.degToRad(16); rightArm.castShadow = true;

  const torqueTubeGeom = new THREE.CylinderGeometry(0.14, 0.14, 2.5, 12);
  torqueTubeGeom.rotateX(Math.PI / 2);
  const torqueTube = new THREE.Mesh(torqueTubeGeom, mats.yellowBody); torqueTube.position.set(1.6, 0.8, 0);
  frontBoomGroup.add(leftArm, rightArm, torqueTube);

  const cylGeom = new THREE.CylinderGeometry(0.14, 0.14, 2.4, 16);
  cylGeom.rotateZ(Math.PI / 2.7);
  const leftRam = new THREE.Mesh(cylGeom, mats.chromeHydraulic); leftRam.position.set(0.9, 0.45, 1.05);
  const rightRam = new THREE.Mesh(cylGeom, mats.chromeHydraulic); rightRam.position.set(0.9, 0.45, -1.05);
  frontBoomGroup.add(leftRam, rightRam);

  const bucketShape = new THREE.Shape();
  bucketShape.moveTo(0, 0);
  bucketShape.lineTo(1.5, -0.1);
  bucketShape.lineTo(2.2, 1.4);
  bucketShape.lineTo(1.2, 1.8);
  bucketShape.lineTo(0, 1.2);
  bucketShape.closePath();

  const bucketGeom = new THREE.ExtrudeGeometry(bucketShape, { depth: 3.5, bevelEnabled: false });
  bucketGeom.center();
  const bucket = new THREE.Mesh(bucketGeom, mats.yellowBody);
  bucket.position.set(3.4, 0.65, 0);
  bucket.rotation.y = Math.PI / 2;
  bucket.castShadow = true;
  frontBoomGroup.add(bucket);

  for (let t = -1.4; t <= 1.4; t += 0.7) {
    const toothGeom = new THREE.ConeGeometry(0.12, 0.45, 4);
    toothGeom.rotateZ(-Math.PI / 2);
    const tooth = new THREE.Mesh(toothGeom, mats.darkSteel);
    tooth.position.set(4.35, 0.1, t);
    frontBoomGroup.add(tooth);
  }
  machineGroup.add(frontBoomGroup);

  // F. Rear Backhoe Excavator Boom & Stabilizers
  const backhoeGroup = new THREE.Group();
  backhoeGroup.position.set(-2.8, 1.8, 0);

  const kingpost = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.4, 16), mats.darkSteel);
  kingpost.position.set(0, 0, 0);
  backhoeGroup.add(kingpost);

  const backBoom = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.35, 0.35), mats.yellowBody);
  backBoom.position.set(-1.0, 1.2, 0);
  backBoom.rotation.z = -THREE.MathUtils.degToRad(48);
  backhoeGroup.add(backBoom);

  const backRam = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.0, 12), mats.chromeHydraulic);
  backRam.position.set(-0.7, 0.8, 0.2);
  backRam.rotation.z = -Math.PI / 3;
  backhoeGroup.add(backRam);

  const dipper = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 0.3), mats.yellowBody);
  dipper.position.set(-2.0, 1.8, 0);
  dipper.rotation.z = THREE.MathUtils.degToRad(30);
  backhoeGroup.add(dipper);

  const rearBucketShape = new THREE.Shape();
  rearBucketShape.moveTo(0, 0);
  rearBucketShape.lineTo(0.9, -0.1);
  rearBucketShape.lineTo(1.1, 0.8);
  rearBucketShape.lineTo(0.2, 0.9);
  rearBucketShape.closePath();

  const rearBucketGeom = new THREE.ExtrudeGeometry(rearBucketShape, { depth: 0.9, bevelEnabled: false });
  rearBucketGeom.center();
  const rearBucket = new THREE.Mesh(rearBucketGeom, mats.darkSteel);
  rearBucket.position.set(-2.6, 1.0, 0);
  rearBucket.rotation.y = Math.PI / 2;
  rearBucket.rotation.x = Math.PI / 6;
  backhoeGroup.add(rearBucket);

  const outriggerGeom = new THREE.BoxGeometry(0.25, 1.6, 0.25);
  const leftOutrigger = new THREE.Mesh(outriggerGeom, mats.darkSteel);
  leftOutrigger.position.set(-0.4, 0.4, 1.6);
  leftOutrigger.rotation.z = -THREE.MathUtils.degToRad(12);
  const rightOutrigger = new THREE.Mesh(outriggerGeom, mats.darkSteel);
  rightOutrigger.position.set(-0.4, 0.4, -1.6);
  rightOutrigger.rotation.z = -THREE.MathUtils.degToRad(12);

  const padGeom = new THREE.BoxGeometry(0.6, 0.08, 0.6);
  const leftPad = new THREE.Mesh(padGeom, mats.yellowBody); leftPad.position.set(-0.55, -0.35, 1.6);
  const rightPad = new THREE.Mesh(padGeom, mats.yellowBody); rightPad.position.set(-0.55, -0.35, -1.6);
  backhoeGroup.add(leftOutrigger, rightOutrigger, leftPad, rightPad);
  machineGroup.add(backhoeGroup);

  // Ground Shadow & Grid
  const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), mats.shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.02;
  scene.add(shadowMesh);

  const gridHelper = new THREE.GridHelper(32, 24, 0xe2e8f0, 0xf1f5f9);
  gridHelper.position.y = 0.01;
  scene.add(gridHelper);

  scene.add(machineGroup);
  camera.lookAt(0, 2.2, 0);

  // Mouse Interaction
  let targetRotY = 0.35;
  let targetRotX = 0.04;
  let currentRotY = 0.35;
  let currentRotX = 0.04;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (!isDragging) {
        targetRotY = 0.35 + x * 0.75;
        targetRotX = 0.04 + y * 0.35;
      }
    }
  });

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.01;
      targetRotX = Math.max(-0.25, Math.min(0.5, targetRotX + deltaY * 0.005));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    currentRotY += (targetRotY - currentRotY) * 0.06;
    currentRotX += (targetRotX - currentRotX) * 0.06;

    machineGroup.rotation.y = currentRotY;
    machineGroup.rotation.x = currentRotX;

    const idleTime = clock.getElapsedTime();
    machineGroup.position.y = Math.sin(idleTime * 4.5) * 0.015;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight || 520;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// =========================================================================
// 2. DARK QUOTE SECTION: 3D HEAVY CRAWLER EXCAVATOR
// =========================================================================
// 2. DARK QUOTE SECTION: REFINED HEAVY CRAWLER EXCAVATOR (HIGH-FIDELITY)
// =========================================================================
function initDarkQuote3D() {
  const container = document.getElementById('quote-3d-canvas-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(13.5, 9.0, 14.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Cinematic Industrial Studio Lighting
  const ambLight = new THREE.AmbientLight(0x1e293b, 1.2);
  scene.add(ambLight);

  const keyLight = new THREE.SpotLight(0xf59e0b, 3.2);
  keyLight.position.set(16, 26, 16);
  keyLight.angle = Math.PI / 4;
  keyLight.penumbra = 0.4;
  keyLight.castShadow = true;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
  fillLight.position.set(-14, 12, -10);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
  rimLight.position.set(10, 15, -15);
  scene.add(rimLight);

  // Dedicated High-End Materials
  const mats = {
    catYellow: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.28,
      metalness: 0.35,
      name: 'catYellow'
    }),
    darkYellow: new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.35,
      metalness: 0.3
    }),
    gunmetalChassis: new THREE.MeshStandardMaterial({
      color: 0x181e26,
      roughness: 0.6,
      metalness: 0.85
    }),
    castIron: new THREE.MeshStandardMaterial({
      color: 0x11161d,
      roughness: 0.75,
      metalness: 0.6
    }),
    chromeRam: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.05,
      metalness: 0.98
    }),
    trackSteel: new THREE.MeshStandardMaterial({
      color: 0x1e242c,
      roughness: 0.7,
      metalness: 0.8
    }),
    cabGlass: new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.52,
      reflectivity: 0.9
    }),
    ledGlow: new THREE.MeshBasicMaterial({
      color: 0xfef08a
    }),
    hoseRubber: new THREE.MeshStandardMaterial({
      color: 0x090b0e,
      roughness: 0.9,
      metalness: 0.1
    }),
    pedestalMat: new THREE.MeshStandardMaterial({
      color: 0x0d121c,
      roughness: 0.8,
      metalness: 0.5
    })
  };

  const excavatorRig = new THREE.Group();

  // 1. Sleek Beveled Ground Pedestal
  const pedestalGeom = new THREE.CylinderGeometry(8.5, 9.2, 0.4, 32);
  const pedestal = new THREE.Mesh(pedestalGeom, mats.pedestalMat);
  pedestal.position.y = -0.2;
  pedestal.receiveShadow = true;
  excavatorRig.add(pedestal);

  // Ground Grid Ring
  const ringGeom = new THREE.RingGeometry(6.5, 6.7, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  excavatorRig.add(ring);

  // 2. Crawler Undercarriage (X-Carbody & Dual Tracks)
  const undercarriage = new THREE.Group();

  // Central X-Carbody
  const centerCarbody = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.9, 3.2), mats.gunmetalChassis);
  centerCarbody.position.y = 0.9;
  centerCarbody.castShadow = true;
  undercarriage.add(centerCarbody);

  // Slewing Ring Base
  const slewRing = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 0.35, 24), mats.castIron);
  slewRing.position.y = 1.45;
  undercarriage.add(slewRing);

  // Left & Right Track Assemblies
  [-2.2, 2.2].forEach(zPos => {
    const trackGroup = new THREE.Group();
    trackGroup.position.set(0, 0, zPos);

    // Trapezoidal Track Side Frame
    const frameBase = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.9, 1.1), mats.gunmetalChassis);
    frameBase.position.y = 0.85;
    trackGroup.add(frameBase);

    // Front Idler Wheel (Tensioner)
    const idler = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.95, 20), mats.castIron);
    idler.rotation.x = Math.PI / 2;
    idler.position.set(3.4, 0.85, 0);
    trackGroup.add(idler);

    // Rear Drive Tumbler Sprocket with teeth
    const sprocket = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.95, 16), mats.castIron);
    sprocket.rotation.x = Math.PI / 2;
    sprocket.position.set(-3.4, 0.85, 0);
    trackGroup.add(sprocket);

    // 6 Lower Track Rollers
    for (let r = -2.4; r <= 2.4; r += 0.96) {
      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.9, 14), mats.castIron);
      roller.rotation.x = Math.PI / 2;
      roller.position.set(r, 0.35, 0);
      trackGroup.add(roller);
    }

    // 2 Upper Carrier Return Rollers
    [-1.2, 1.2].forEach(topR => {
      const carrier = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 12), mats.castIron);
      carrier.rotation.x = Math.PI / 2;
      carrier.position.set(topR, 1.35, 0);
      trackGroup.add(carrier);
    } );

    // Continuous Track Chain Pads (Upper & Lower Runs)
    for (let p = -3.2; p <= 3.2; p += 0.4) {
      // Top pad with grouser cleat
      const topPad = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 1.25), mats.trackSteel);
      topPad.position.set(p, 1.55, 0);
      trackGroup.add(topPad);

      // Bottom pad on ground
      const botPad = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 1.25), mats.trackSteel);
      botPad.position.set(p, 0.08, 0);
      trackGroup.add(botPad);
    }

    // Access Step Plate
    const stepPlate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.35), mats.catYellow);
    stepPlate.position.set(0, 1.35, (zPos > 0 ? 0.7 : -0.7));
    trackGroup.add(stepPlate);

    undercarriage.add(trackGroup);
  });

  excavatorRig.add(undercarriage);

  // 3. Superstructure (Revolving Upper Deck)
  const upperDeck = new THREE.Group();
  upperDeck.position.set(0, 1.6, 0);

  // Sleek Machinery Deck Body
  const deckBase = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.8, 3.8), mats.gunmetalChassis);
  deckBase.position.set(-0.2, 0.4, 0);
  upperDeck.add(deckBase);

  // Heavy Curved Counterweight at Rear
  const cwGroup = new THREE.Group();
  cwGroup.position.set(-2.6, 0.8, 0);

  const cwMain = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 3.75), mats.catYellow);
  cwMain.position.set(0, 0.5, 0);
  cwGroup.add(cwMain);

  // Beveled counterweight top chamfer
  const cwTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 3.6), mats.darkYellow);
  cwTop.position.set(0.1, 1.4, 0);
  cwGroup.add(cwTop);

  // Rear Black Louvered Radiator Grill Slits
  for (let g = 0; g < 4; g++) {
    const grill = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 2.6), mats.castIron);
    grill.position.set(-0.76, 0.4 + g * 0.28, 0);
    cwGroup.add(grill);
  }

  // Safety Warning Beacons
  [-1.4, 1.4].forEach(zB => {
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 10), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    beacon.position.set(-0.6, 1.5, zB);
    cwGroup.add(beacon);
  });
  upperDeck.add(cwGroup);

  // Engine Hood with Louvers
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.2), mats.catYellow);
  hood.position.set(-0.7, 1.2, -0.75);
  upperDeck.add(hood);

  // High-Rise Exhaust Stack with Rain Cap
  const exhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.4, 12), mats.castIron);
  exhaustPipe.position.set(-1.4, 2.2, -1.2);
  upperDeck.add(exhaustPipe);

  const rainCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.05, 0.15, 12), mats.castIron);
  rainCap.position.set(-1.4, 2.95, -1.2);
  rainCap.rotation.z = 0.2;
  upperDeck.add(rainCap);

  // Hydraulic Oil Reservoir & Step Walkway (Right Side)
  const hydTank = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.0, 1.3), mats.catYellow);
  hydTank.position.set(0.8, 1.1, -1.2);
  upperDeck.add(hydTank);

  // Yellow Safety Handrail
  const railGeom = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
  const railBar = new THREE.Mesh(railGeom, mats.catYellow);
  railBar.rotation.z = Math.PI / 2;
  railBar.position.set(0.8, 1.9, -1.8);
  upperDeck.add(railBar);

  // 4. Operator Cabin (Modern Glazed Cab on Left Front Deck)
  const cabGroup = new THREE.Group();
  cabGroup.position.set(0.6, 0.8, 1.15);

  // Cab Frame Pillars (ROPS)
  const cabFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 1.45), mats.gunmetalChassis);
  cabFrame.position.set(0, 1.1, 0);
  cabGroup.add(cabFrame);

  // Blue Tinted Glass Enclosure
  const cabGlassMesh = new THREE.Mesh(new THREE.BoxGeometry(2.05, 1.9, 1.35), mats.cabGlass);
  cabGlassMesh.position.set(0.05, 1.1, 0);
  cabGroup.add(cabGlassMesh);

  // Cab Roof with Sun Visor
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.18, 1.55), mats.catYellow);
  cabRoof.position.set(0.05, 2.25, 0);
  cabGroup.add(cabRoof);

  // Dual Roof LED Work Lights
  [-0.45, 0.45].forEach(zL => {
    const lampHousing = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.22, 0.25), mats.gunmetalChassis);
    lampHousing.position.set(1.15, 2.25, zL);
    const lampLens = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.18), mats.ledGlow);
    lampLens.rotation.y = Math.PI / 2;
    lampLens.position.set(1.28, 2.25, zL);
    cabGroup.add(lampHousing, lampLens);
  });

  // Operator Seat & Consoles Inside
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.55), mats.castIron);
  seat.position.set(-0.2, 0.85, 0);
  cabGroup.add(seat);

  const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.4), mats.gunmetalChassis);
  consoleBox.position.set(0.45, 0.7, 0);
  cabGroup.add(consoleBox);

  // Exterior Side Mirror
  const mirrorArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6), mats.chromeRam);
  mirrorArm.position.set(1.2, 1.6, 0.85);
  mirrorArm.rotation.z = -0.3;
  cabGroup.add(mirrorArm);

  const mirrorHead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.22), mats.gunmetalChassis);
  mirrorHead.position.set(1.4, 1.9, 0.95);
  cabGroup.add(mirrorHead);

  upperDeck.add(cabGroup);

  // 5. High-Pressure Heavy Excavator Work Equipment (Mono-Boom, Stick, Bucket)
  const boomBaseMount = new THREE.Group();
  boomBaseMount.position.set(1.4, 1.1, -0.35);

  // Heavy Curved Mono-Boom
  const monoBoom = new THREE.Group();

  // Boom Section 1 (Lower Angled Section)
  const boomLower = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.68, 0.55), mats.catYellow);
  boomLower.position.set(1.5, 1.2, 0);
  boomLower.rotation.z = THREE.MathUtils.degToRad(48);
  boomLower.castShadow = true;
  monoBoom.add(boomLower);

  // Boom Section 2 (Upper Curved Gooseneck)
  const boomUpper = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.58, 0.5), mats.catYellow);
  boomUpper.position.set(3.4, 2.8, 0);
  boomUpper.rotation.z = THREE.MathUtils.degToRad(16);
  boomUpper.castShadow = true;
  monoBoom.add(boomUpper);

  // Main Dual Boom Lift Cylinders (Left & Right)
  [-0.42, 0.42].forEach(zC => {
    const cylBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.2, 16), mats.catYellow);
    cylBarrel.position.set(0.8, 0.8, zC);
    cylBarrel.rotation.z = THREE.MathUtils.degToRad(35);
    monoBoom.add(cylBarrel);

    const cylPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 1.8, 16), mats.chromeRam);
    cylPiston.position.set(1.6, 1.4, zC);
    cylPiston.rotation.z = THREE.MathUtils.degToRad(35);
    monoBoom.add(cylPiston);
  });

  // Black Hydraulic Hoses along top of boom
  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0.8, 0.15),
    new THREE.Vector3(1.6, 2.2, 0.18),
    new THREE.Vector3(3.2, 3.4, 0.16),
    new THREE.Vector3(4.8, 3.2, 0.12)
  ]);
  const hoseGeom = new THREE.TubeGeometry(hoseCurve, 20, 0.05, 8, false);
  const hoseMesh = new THREE.Mesh(hoseGeom, mats.hoseRubber);
  monoBoom.add(hoseMesh);

  // Articulated Dipper Stick (Arm)
  const dipperGroup = new THREE.Group();
  dipperGroup.position.set(4.9, 3.2, 0); // Pin joint at boom apex

  const stickArm = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.52, 0.46), mats.catYellow);
  stickArm.position.set(1.3, -1.1, 0);
  stickArm.rotation.z = -THREE.MathUtils.degToRad(38);
  stickArm.castShadow = true;
  dipperGroup.add(stickArm);

  // Stick Hydraulic Cylinder on top of boom
  const stickCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 2.2, 16), mats.catYellow);
  stickCyl.position.set(-1.0, 0.4, 0);
  stickCyl.rotation.z = THREE.MathUtils.degToRad(25);
  dipperGroup.add(stickCyl);

  const stickRam = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.8, 16), mats.chromeRam);
  stickRam.position.set(0.0, 0.8, 0);
  stickRam.rotation.z = THREE.MathUtils.degToRad(25);
  dipperGroup.add(stickRam);

  // Rock Excavator Bucket with 5 Digging Teeth & 4-Bar Linkage
  const bucketGroup = new THREE.Group();
  bucketGroup.position.set(2.6, -2.4, 0);

  // Curved Bucket Profile
  const bShape = new THREE.Shape();
  bShape.moveTo(0, 0);
  bShape.lineTo(1.6, -0.4);
  bShape.lineTo(2.0, 0.9);
  bShape.lineTo(0.7, 1.4);
  bShape.lineTo(0, 0.8);
  bShape.closePath();

  const bucketGeom = new THREE.ExtrudeGeometry(bShape, { depth: 1.5, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06 });
  const bucketMesh = new THREE.Mesh(bucketGeom, mats.darkSteel);
  bucketMesh.position.set(-0.2, -0.4, -0.75);
  bucketMesh.castShadow = true;
  bucketGroup.add(bucketMesh);

  // 5 Pointed Ground-Engaging Chisel Teeth
  for (let t = -0.6; t <= 0.6; t += 0.3) {
    const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.38, 5), mats.catYellow);
    tooth.position.set(1.55, -0.85, t);
    tooth.rotation.z = -Math.PI / 3;
    bucketGroup.add(tooth);
  }

  // Bucket Curl Cylinder & Dog-Bone Link
  const curlCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.6, 14), mats.catYellow);
  curlCyl.position.set(-0.6, 0.6, 0);
  curlCyl.rotation.z = -0.5;
  bucketGroup.add(curlCyl);

  const curlRam = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.4, 14), mats.chromeRam);
  curlRam.position.set(0.1, 0.2, 0);
  curlRam.rotation.z = -0.5;
  bucketGroup.add(curlRam);

  dipperGroup.add(bucketGroup);
  monoBoom.add(dipperGroup);
  boomBaseMount.add(monoBoom);
  upperDeck.add(boomBaseMount);

  excavatorRig.add(upperDeck);
  scene.add(excavatorRig);

  // Fine Excavation Dust & Golden Ambient Sparks
  const particleCount = 260;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 5 + 4.5;
    particlePositions[i * 3 + 1] = Math.random() * 2.2 + 0.1;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.015,
      y: Math.random() * 0.018 + 0.006,
      z: (Math.random() - 0.5) * 0.015
    });
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xf59e0b,
    size: 0.10,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  camera.lookAt(1.2, 2.2, 0);

  // Smooth Cursor Physics Orbit & Interaction
  let targetRotY = -0.32;
  let targetRotX = 0.04;
  let currentRotY = -0.32;
  let currentRotX = 0.04;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = -0.32 + x * 0.65;
      targetRotX = 0.04 + y * 0.28;
    }
  });

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Fluid turntable damping
    currentRotY += (targetRotY - currentRotY) * 0.06;
    currentRotX += (targetRotX - currentRotX) * 0.06;
    excavatorRig.rotation.y = currentRotY;
    excavatorRig.rotation.x = currentRotX;

    // Organic hydraulic movement simulation
    dipperGroup.rotation.z = Math.sin(time * 1.4) * 0.06;
    bucketGroup.rotation.z = Math.sin(time * 1.4 + 0.5) * 0.09;
    monoBoom.rotation.z = Math.sin(time * 0.9) * 0.03;

    // Particle swirl update
    const positions = particleGeom.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particleVelocities[i].x;
      positions[i * 3 + 1] += particleVelocities[i].y;
      positions[i * 3 + 2] += particleVelocities[i].z;

      if (positions[i * 3 + 1] > 3.2) {
        positions[i * 3] = (Math.random() - 0.5) * 3 + 4.5;
        positions[i * 3 + 1] = 0.15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }
    }
    particleGeom.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight || 480;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// =========================================================================
// 3. REFINED, CRYSTAL-CLEAR 3D CATALOG MODELS (All 8 Machinery Cards)
// =========================================================================
const CATALOG_CANVASES = {};

function initCatalogCard3D(containerId, modelType) {
  const container = document.getElementById(containerId);
  if (!container || CATALOG_CANVASES[containerId]) return;

  const width = container.clientWidth || 240;
  const height = container.clientHeight || 160;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(5.5, 3.8, 6.0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // High quality studio lighting
  const amb = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(amb);
  const keySun = new THREE.DirectionalLight(0xfffbeb, 1.4);
  keySun.position.set(12, 18, 12);
  scene.add(keySun);
  const rim = new THREE.DirectionalLight(0x38bdf8, 0.6);
  rim.position.set(-10, 8, -8);
  scene.add(rim);

  const mats = createIndustrialMaterials();
  const group = new THREE.Group();

  switch (modelType) {
    // -------------------------------------------------------------
    // 1. HEAVY JAW CRUSHER PLANT
    // -------------------------------------------------------------
    case 'crusher': {
      // Skid Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 2.2), mats.darkChassis);
      base.position.y = 0.2;

      // Heavy Side Plates (Cheek Plates)
      const leftPlate = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.25), mats.darkSteel);
      leftPlate.position.set(0, 1.2, 0.95);
      const rightPlate = leftPlate.clone();
      rightPlate.position.set(0, 1.2, -0.95);

      // Yellow In-feed Hopper
      const hopper = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 0.8, 1.1, 4), mats.yellowBody);
      hopper.rotation.y = Math.PI / 4;
      hopper.position.set(0.1, 2.3, 0);

      // Twin Heavy Cast Iron Flywheels on both sides
      const flywheelGeom = new THREE.CylinderGeometry(0.85, 0.85, 0.22, 24);
      flywheelGeom.rotateX(Math.PI / 2);
      const leftFlywheel = new THREE.Mesh(flywheelGeom, mats.darkSteel); leftFlywheel.position.set(-0.2, 1.4, 1.2);
      const rightFlywheel = new THREE.Mesh(flywheelGeom, mats.darkSteel); rightFlywheel.position.set(-0.2, 1.4, -1.2);

      // Center Eccentric Shaft
      const shaftGeom = new THREE.CylinderGeometry(0.16, 0.16, 2.7, 16);
      shaftGeom.rotateX(Math.PI / 2);
      const shaft = new THREE.Mesh(shaftGeom, mats.chromeHydraulic);
      shaft.position.set(-0.2, 1.4, 0);

      // Electric Drive Motor
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 16), mats.yellowBody);
      motor.position.set(1.2, 0.7, -0.8);

      group.add(base, leftPlate, rightPlate, hopper, leftFlywheel, rightFlywheel, shaft, motor);
      group.scale.set(0.9, 0.9, 0.9);
      break;
    }

    // -------------------------------------------------------------
    // 2. INDUSTRIAL OVERHEAD HOIST & CRANE TROLLEY
    // -------------------------------------------------------------
    case 'crane': {
      // Double Box Girder Frame
      const g1 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 0.4), mats.yellowBody); g1.position.set(0, 2.2, 0.85);
      const g2 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 0.4), mats.yellowBody); g2.position.set(0, 2.2, -0.85);

      // Trolley Frame
      const trolley = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 1.9), mats.darkSteel);
      trolley.position.set(0, 2.5, 0);

      // Wire Rope Drum
      const drumGeom = new THREE.CylinderGeometry(0.42, 0.42, 1.3, 20);
      drumGeom.rotateZ(Math.PI / 2);
      const drum = new THREE.Mesh(drumGeom, mats.darkChassis);
      drum.position.set(0, 2.9, 0);

      // Electric Motor & Gearbox
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.7, 16), mats.yellowBody);
      motor.position.set(1.1, 2.9, 0);
      motor.rotation.z = Math.PI / 2;

      // Wire Rope Falls & Heavy Double Forged Hook
      const rope1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), mats.chromeHydraulic); rope1.position.set(-0.2, 1.5, 0);
      const rope2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), mats.chromeHydraulic); rope2.position.set(0.2, 1.5, 0);

      const hookBlock = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.4, 0.4), mats.yellowBody);
      hookBlock.position.set(0, 0.75, 0);

      const hookTorus = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.07, 8, 16, Math.PI * 1.4), mats.darkSteel);
      hookTorus.position.set(0, 0.35, 0);
      hookTorus.rotation.z = Math.PI * 0.8;

      group.add(g1, g2, trolley, drum, motor, rope1, rope2, hookBlock, hookTorus);
      group.scale.set(0.85, 0.85, 0.85);
      break;
    }

    // -------------------------------------------------------------
    // 3. INCLINE VIBRATING SCREEN 2YK (Authentic Blue)
    // -------------------------------------------------------------
    case 'screen': {
      // Sloped Screen Body Box
      const screenBox = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 1.8), mats.screenBlue);
      screenBox.position.set(0, 1.4, 0);
      screenBox.rotation.z = -THREE.MathUtils.degToRad(18); // Incline angle

      // Top Feed Hopper Lip
      const feedLip = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 1.7), mats.yellowBody);
      feedLip.position.set(-1.7, 2.2, 0);

      // Bottom Multi-deck Discharge Chutes
      const chute1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 1.7), mats.yellowBody);
      chute1.position.set(1.9, 0.9, 0);
      const chute2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 1.7), mats.darkSteel);
      chute2.position.set(1.9, 0.6, 0);

      // 4 Heavy Coil Springs (Corner Supports)
      const springGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.7, 12);
      const s1 = new THREE.Mesh(springGeom, mats.darkSteel); s1.position.set(-1.2, 0.4, 0.9);
      const s2 = new THREE.Mesh(springGeom, mats.darkSteel); s2.position.set(1.2, 0.4, 0.9);
      const s3 = new THREE.Mesh(springGeom, mats.darkSteel); s3.position.set(-1.2, 0.4, -0.9);
      const s4 = new THREE.Mesh(springGeom, mats.darkSteel); s4.position.set(1.2, 0.4, -0.9);

      // Center Eccentric Vibrator Shaft Housing
      const vibratorTube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 2.2, 16), mats.yellowBody);
      vibratorTube.rotation.x = Math.PI / 2;
      vibratorTube.position.set(0, 1.4, 0);

      // Drive Sheave Pulley
      const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.15, 16), mats.darkSteel);
      pulley.rotation.x = Math.PI / 2;
      pulley.position.set(0, 1.4, 1.15);

      group.add(screenBox, feedLip, chute1, chute2, s1, s2, s3, s4, vibratorTube, pulley);
      group.scale.set(0.9, 0.9, 0.9);
      break;
    }

    // -------------------------------------------------------------
    // 4. PRECISION COKE-OVEN DOOR & SEALING ASSEMBLY
    // -------------------------------------------------------------
    case 'coke-oven':
    case 'cokeOven': {
      // Tall Structural Door Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.4, 0.35), mats.darkSteel);
      frame.position.y = 1.7;

      // Vertical Stiffener Beams
      const beamL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.4, 0.2), mats.yellowBody); beamL.position.set(-0.65, 1.7, 0.22);
      const beamR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.4, 0.2), mats.yellowBody); beamR.position.set(0.65, 1.7, 0.22);

      // Horizontal Latching Bars (Top, Middle, Bottom)
      const latch1 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.2, 0.22), mats.darkChassis); latch1.position.set(0, 2.8, 0.25);
      const latch2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.2, 0.22), mats.darkChassis); latch2.position.set(0, 1.7, 0.25);
      const latch3 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.2, 0.22), mats.darkChassis); latch3.position.set(0, 0.6, 0.25);

      // Clamping Screws
      const screwGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 8);
      screwGeom.rotateX(Math.PI / 2);
      const s1 = new THREE.Mesh(screwGeom, mats.chromeHydraulic); s1.position.set(0.7, 2.8, 0.38);
      const s2 = new THREE.Mesh(screwGeom, mats.chromeHydraulic); s2.position.set(-0.7, 2.8, 0.38);
      const s3 = new THREE.Mesh(screwGeom, mats.chromeHydraulic); s3.position.set(0.7, 0.6, 0.38);
      const s4 = new THREE.Mesh(screwGeom, mats.chromeHydraulic); s4.position.set(-0.7, 0.6, 0.38);

      // Gas Extraction Flange at top
      const gasPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16), mats.yellowBody);
      gasPipe.position.set(0, 3.5, 0);

      group.add(frame, beamL, beamR, latch1, latch2, latch3, s1, s2, s3, s4, gasPipe);
      group.scale.set(0.85, 0.85, 0.85);
      break;
    }

    // -------------------------------------------------------------
    // 5. CONVEYORS, DRUMS & IDLER SYSTEM
    // -------------------------------------------------------------
    case 'conveyor': {
      // Truss Structural Frame
      const truss = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.3, 1.4), mats.yellowBody);
      truss.position.set(0, 1.2, 0);
      truss.rotation.z = -THREE.MathUtils.degToRad(15);

      // Large Drive Drum (Lagged)
      const driveDrumGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.55, 20);
      driveDrumGeom.rotateX(Math.PI / 2);
      const driveDrum = new THREE.Mesh(driveDrumGeom, mats.darkChassis);
      driveDrum.position.set(-1.8, 1.6, 0);

      // Tail Drum
      const tailDrumGeom = new THREE.CylinderGeometry(0.4, 0.4, 1.55, 20);
      tailDrumGeom.rotateX(Math.PI / 2);
      const tailDrum = new THREE.Mesh(tailDrumGeom, mats.darkSteel);
      tailDrum.position.set(1.8, 0.7, 0);

      // Rubber Conveyor Belt
      const beltTop = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.08, 1.4), mats.tireRubber);
      beltTop.position.set(0, 1.55, 0);
      beltTop.rotation.z = -THREE.MathUtils.degToRad(15);

      const beltBottom = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.08, 1.4), mats.tireRubber);
      beltBottom.position.set(0, 0.85, 0);
      beltBottom.rotation.z = -THREE.MathUtils.degToRad(15);

      // 3-Roll Troughing Idlers in Center
      const idlerCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.6, 12), mats.darkSteel);
      idlerCenter.rotation.x = Math.PI / 2;
      idlerCenter.position.set(0, 1.45, 0);

      // Drive Motor Gearbox
      const motor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.8), mats.yellowBody);
      motor.position.set(-1.8, 1.6, 1.2);

      group.add(truss, driveDrum, tailDrum, beltTop, beltBottom, idlerCenter, motor);
      group.scale.set(0.9, 0.9, 0.9);
      break;
    }

    // -------------------------------------------------------------
    // 6. 16' PRECISION HEAVY DUTY CENTRE LATHE
    // -------------------------------------------------------------
    case 'lathe': {
      // Cast Iron Lathe Bed with V-Ways
      const bed = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.5, 1.1), mats.darkChassis);
      bed.position.set(0, 0.7, 0);

      // Cabinet Pedestal Legs
      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 1.0), mats.darkSteel); legL.position.set(-1.6, 0.35, 0);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 1.0), mats.darkSteel); legR.position.set(1.6, 0.35, 0);

      // Enclosed Headstock Gearbox
      const headstock = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.1), mats.yellowBody);
      headstock.position.set(-1.5, 1.3, 0);

      // Large 4-Jaw Chuck
      const chuckGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.35, 24);
      chuckGeom.rotateZ(Math.PI / 2);
      const chuck = new THREE.Mesh(chuckGeom, mats.darkSteel);
      chuck.position.set(-0.75, 1.3, 0);

      // Chrome Machined Workpiece Shaft
      const shaftGeom = new THREE.CylinderGeometry(0.18, 0.18, 2.5, 16);
      shaftGeom.rotateZ(Math.PI / 2);
      const shaft = new THREE.Mesh(shaftGeom, mats.chromeHydraulic);
      shaft.position.set(0.5, 1.3, 0);

      // Carriage Saddle & Toolpost
      const carriage = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 1.2), mats.darkSteel);
      carriage.position.set(0.1, 1.1, 0);
      const toolpost = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.4, 0.25), mats.yellowBody);
      toolpost.position.set(0.1, 1.4, 0.25);

      // Tailstock
      const tailstock = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.9), mats.yellowBody);
      tailstock.position.set(1.7, 1.2, 0);

      group.add(bed, legL, legR, headstock, chuck, shaft, carriage, toolpost, tailstock);
      group.scale.set(0.85, 0.85, 0.85);
      break;
    }

    // -------------------------------------------------------------
    // 7. SELF-SUPPORTING ESP CHIMNEY & CYCLONE DUCT TOWER
    // -------------------------------------------------------------
    case 'esp': {
      // Chimney Stack Cylinder
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.9, 3.6, 24), mats.yellowBody);
      stack.position.y = 1.9;

      // Conical Base Bell
      const baseBell = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.35, 0.8, 24), mats.darkSteel);
      baseBell.position.y = 0.4;

      // Stiffening Rings
      const ringGeom = new THREE.TorusGeometry(0.68, 0.05, 8, 24);
      ringGeom.rotateX(Math.PI / 2);
      const r1 = new THREE.Mesh(ringGeom, mats.darkSteel); r1.position.y = 2.8;
      const r2 = new THREE.Mesh(ringGeom, mats.darkSteel); r2.position.y = 2.0;
      const r3 = new THREE.Mesh(ringGeom, mats.darkSteel); r3.position.y = 1.2;

      // Gas Transition Duct Inlet Branch
      const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.6, 16), mats.darkChassis);
      duct.rotation.z = Math.PI / 3;
      duct.position.set(-0.8, 1.2, 0);

      // Caged Inspection Ladder
      const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.4, 0.05), mats.darkSteel);
      ladder.position.set(0.72, 1.8, 0);

      group.add(stack, baseBell, r1, r2, r3, duct, ladder);
      group.scale.set(0.85, 0.85, 0.85);
      break;
    }

    // -------------------------------------------------------------
    // 8. PIG CASTING MACHINE CHAIN ASSEMBLY
    // -------------------------------------------------------------
    case 'chains': {
      // 3 Interlocking Forged Chain Links
      for (let i = -1; i <= 1; i++) {
        const linkGroup = new THREE.Group();
        linkGroup.position.set(i * 1.3, 1.2, 0);

        // Side Link Plates (Top & Bottom)
        const plateShape = new THREE.Shape();
        plateShape.moveTo(-0.6, -0.25);
        plateShape.lineTo(0.6, -0.25);
        plateShape.absarc(0.6, 0, 0.25, -Math.PI / 2, Math.PI / 2, false);
        plateShape.lineTo(-0.6, 0.25);
        plateShape.absarc(-0.6, 0, 0.25, Math.PI / 2, -Math.PI / 2, false);

        const plateGeom = new THREE.ExtrudeGeometry(plateShape, { depth: 0.12, bevelEnabled: false });
        plateGeom.center();

        const frontPlate = new THREE.Mesh(plateGeom, mats.yellowBody); frontPlate.position.z = 0.45;
        const rearPlate = new THREE.Mesh(plateGeom, mats.yellowBody); rearPlate.position.z = -0.45;

        // Heavy Flanged Roller in Center
        const rollerGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.65, 20);
        rollerGeom.rotateX(Math.PI / 2);
        const roller = new THREE.Mesh(rollerGeom, mats.darkSteel);

        // Chain Pin
        const pinGeom = new THREE.CylinderGeometry(0.16, 0.16, 1.15, 16);
        pinGeom.rotateX(Math.PI / 2);
        const pin = new THREE.Mesh(pinGeom, mats.chromeHydraulic);

        // Top Carrier Bracket
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.9), mats.darkChassis);
        bracket.position.y = 0.38;

        linkGroup.add(frontPlate, rearPlate, roller, pin, bracket);
        group.add(linkGroup);
      }
      group.scale.set(0.85, 0.85, 0.85);
      break;
    }

    default: {
      const box = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 2.0), mats.yellowBody);
      box.position.y = 0.8;
      group.add(box);
    }
  }

  scene.add(group);
  camera.lookAt(0, 1.2, 0);

  let targetRotY = 0.35;
  let targetRotX = 0;
  let isHovered = false;

  const parentCard = container.closest('.catalog-card') || container;
  parentCard.addEventListener('mouseenter', () => { isHovered = true; });
  parentCard.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotY = 0.35;
    targetRotX = 0;
  });

  parentCard.addEventListener('mousemove', (e) => {
    const rect = parentCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotY = 0.35 + x * 1.4;
    targetRotX = y * 0.7;
  });

  function renderCard() {
    requestAnimationFrame(renderCard);
    group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.08;
    if (!isHovered) {
      group.rotation.y += 0.005; // gentle idle spin
    }
    renderer.render(scene, camera);
  }
  renderCard();

  CATALOG_CANVASES[containerId] = { renderer, camera };
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initHero3D();
    initDarkQuote3D();

    const catalogCards = [
      { id: 'cat-3d-1', type: 'crusher' },
      { id: 'cat-3d-2', type: 'crane' },
      { id: 'cat-3d-3', type: 'screen' },
      { id: 'cat-3d-4', type: 'cokeOven' },
      { id: 'cat-3d-5', type: 'conveyor' },
      { id: 'cat-3d-6', type: 'lathe' },
      { id: 'cat-3d-7', type: 'esp' },
      { id: 'cat-3d-8', type: 'chains' }
    ];

    catalogCards.forEach(card => {
      initCatalogCard3D(card.id, card.type);
    });
  }, 200);
});
