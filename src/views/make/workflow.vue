<template>
  <el-button type="primary" plain>
    <input type="file" @change="readFile" />
    添加作业流程信息
  </el-button>
  <!-- <div
    v-show="workBook.workNo != undefined"
    class="workflow-container-three"
  >
    <canvas
      id="c"
      class="workflow-container-three-obj"
      style="width: 800px; height: 400px"
    ></canvas>
  </div> -->

  <div class="workflow-container" v-if="workBook.workNo != undefined">
    <div class="workflow-container-left">
      <h1>作业步骤分解</h1>
      <div v-for="o in process" :key="o" class="process-card">
        <el-card class="box-card">
          <h2>步骤{{ o.id }}</h2>
          <p>作业分解:{{ o.explanation }}</p>
          <p v-if="o.minutues != undefined || o.seconds != undefined">
            用时:
            <span v-if="o.minutues != undefined">{{ o.minutes }}分</span>
            <span v-if="o.seconds != undefined">{{ o.seconds }}秒</span>
          </p>
          <p>主要步骤：{{ o.MainSteps }}</p>
          <p>重点：{{ o.focus }}</p>
        </el-card>
      </div>
    </div>
    <div class="workflow-container-right">
      <h1>作业基本信息</h1>
      {{ workBook.workNo }}
      <p>作业名:{{ workBook.workName }}</p>
      <p>劳保工具:{{ workBook.userProtectionTools }}</p>
      <p>加工工具:{{ workBook.userTools }}</p>
      <p>零件名:{{ workBook.partName }}</p>
      <p>工序号:{{ workBook.sequence }}</p>
      <p>禁止事项:{{ workBook.ban }}</p>
      <p>其他事项:{{ workBook.other }}</p>
    </div>
  </div>
</template>

<script>
import { readWorkFlowFile } from "@/util/ExcelUtils.js";
import { ref } from "vue";
import * as THREE from "three";
import axios from "@/axios/index";
class Workbook {
  workNo;
  workName;
  userProtectionTools;
  userTools;
  partName;
  sequence;
  process;
  ban;
  other;
}

class WorkbookProcess {
  id;
  explanation;
  minutes;
  seconds;
  MainSteps;
  focus;
}

export default {
  // mounted() {
  //   this.initThree();
  // },
  // methods: {
  //   initThree() {
  //     const canvas = document.querySelector("#c");
  //     const renderer = new THREE.WebGLRenderer({ canvas });

  //     const fov = 75;
  //     const aspect = 2; // the canvas default
  //     const near = 0.1;
  //     const far = 5;
  //     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //     camera.position.z = 2;

  //     const scene = new THREE.Scene();

  //     {
  //       const color = 0xffffff;
  //       const intensity = 1;
  //       const light = new THREE.DirectionalLight(color, intensity);
  //       light.position.set(-1, 2, 4);
  //       scene.add(light);
  //     }

  //     const boxWidth = 1;
  //     const boxHeight = 1;
  //     const boxDepth = 1;
  //     const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //     function makeInstance(geometry, color, x) {
  //       const material = new THREE.MeshPhongMaterial({ color });

  //       const cube = new THREE.Mesh(geometry, material);
  //       scene.add(cube);

  //       cube.position.x = x;

  //       return cube;
  //     }

  //     const geometry2 = new THREE.SphereGeometry(5);
  //     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  //     let sphereInter = new THREE.Mesh(geometry2, material);
  //     sphereInter.visible = true;
  //     scene.add(sphereInter);

  //     const cubes = [
  //       makeInstance(geometry, 0x44aa88, 0),
  //       makeInstance(geometry, 0x8844aa, -2),
  //       makeInstance(geometry, 0xaa8844, 2),
  //     ];

  //     function resizeRendererToDisplaySize(renderer) {
  //       const canvas = renderer.domElement;
  //       const width = canvas.clientWidth;
  //       const height = canvas.clientHeight;
  //       const needResize = canvas.width !== width || canvas.height !== height;
  //       if (needResize) {
  //         renderer.setSize(width, height, false);
  //       }
  //       return needResize;
  //     }
  //     const raycaster = new THREE.Raycaster();
  //     const mouse = new THREE.Vector2();

  //     function onMouseMove(event) {
  //       // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

  //       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     }
  //     function render(time) {
  //       time *= 0.001;

  //       if (resizeRendererToDisplaySize(renderer)) {
  //         const canvas = renderer.domElement;
  //         camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //         camera.updateProjectionMatrix();
  //       }

  //       cubes.forEach((cube, ndx) => {
  //         const speed = 1 + ndx * 0.1;
  //         const rot = time * speed;
  //         cube.rotation.x = rot;
  //         cube.rotation.y = rot;
  //       });

  //       // 通过摄像机和鼠标位置更新射线
  //       raycaster.setFromCamera(mouse, camera);

  //       // 计算物体和射线的焦点
  //       const intersects = raycaster.intersectObjects(scene.children);

  //       for (let i = 0; i < intersects.length; i++) {
  //         intersects[i].object.material.color.set(0xff0000);
  //       }

  //       renderer.render(scene, camera);

  //       requestAnimationFrame(render);
  //     }
  //     addEventListener("mousemove", onMouseMove, false);

  //     requestAnimationFrame(render);
  //   },
  // },
  setup() {
    let workBook = ref(new Workbook());
    let p = new WorkbookProcess();
    let process = ref([p]);
    const readFile = (e) => {
      //(e: Event) => {
      const target = e.target; //as HTMLInputElement;
      const file = target.files;
      readWorkFlowFile(file).then((data) => {
        workBook.value = data;
        console.log(workBook);
        process.value = workBook.value.process;
        axios.post("/pms/make/work-book", workBook.value).then(
          (resp) => {
            console.log(resp);
            console.log("work-book", resp);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    };
    return {
      readFile,
      workBook,
      process,
    };
  },
};
</script>

<style>
.process-card {
  text-align: start;
  margin-bottom: 10px;
}
.workflow-container {
  display: flex;
}
.workflow-container-left {
  background-color: white;
  border: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
}
.workflow-container-right {
  background-color: white;
  width: 30%;
  margin-left: 10px;
  padding: 20px;
  border-radius: 10px;
}
.workflow-container-three {
  background-color: antiquewhite;
  width: 100%;
}
.workflow-container-three-obj {
  width: 80%;
}
</style>
