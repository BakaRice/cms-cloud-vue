<template>
  <h1>零件检查要求编辑</h1>
  <div class="three-container">
    <div class="three-container-left">
      <canvas id="three"></canvas>
      <div clas="three-container-left-down">
        <p>详情</p>
        <el-card class="box-card">{{ detail }}</el-card>
        <el-form :inline="true" :model="detail">
          <el-form-item label="要求名称">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item label="要求级别">
            <el-select v-model="detail.level" placeholder="请选择检查级别">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="detail">
          <el-form-item label="详细描述">
            <el-input type="textarea" v-model="detail.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="three-container-right">
      <div>
        <p>threeType:{{ threeType == 0 ? "编辑模式" : "使用模式" }}</p>

        <div
          v-for="(item, index) in xylist"
          :key="index"
          style="
            border: 1.5px solid gray;
            margin: 10px 10px 0px 10px;
            border-radius: 10px;
            padding: 10px 0;
          "
        >
          <div class="select-container">
            <div class="select-container-left">
              <el-row :gutter="20">
                <el-col :span="1">
                  <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="22">
                  <div :style="handleColor(index)">{{ index }}</div>
                </el-col>
                <el-col :span="1">
                  <div class="grid-content bg-purple"></div>
                </el-col>
              </el-row>
            </div>
            <div class="select-container-right">
              <el-button round @click="threeDetail(index)">查看详情</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GridHelper, Raycaster, Vector2 } from "three";
//glTF加载器 加在外部模型
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//引入轨道控制器:
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { color } from "node_modules/echarts";
export default {
  data() {
    return {
      message: "没发生任何事情!",
      threeType: 0,
      xylist: [
        // {
        //   color: "",
        //   x1: 106.94854223790232,
        //   x2: 98.79455027688074,
        //   y1: 40.77814534955619,
        //   y2: 59.452386094189556,
        //   z1: 92.00581848411622,
        //   z2: 77.47593061955732,
        // },
        // {
        //   color: "",
        //   x1: 88.22496479712281,
        //   x2: -120.79657406877146,
        //   y1: -97.1422783517286,
        //   y2: 91.52537862850934,
        //   z1: 84.66875495775793,
        //   z2: -36.22698833419239,
        // },
      ],
      detail: {
        // index: "",
        // name: "",
        // x1: 0,
        // x2: 0,
        // y1: 0,
        // y2: 0,
        // z1: 0,
        // z2: 0,
      },
    };
  },
  computed() {
    return {};
  },
  mounted() {
    this.initThree();
  },
  methods: {
    threeDetail(i) {
      console.log("getDetail");
      this.detail = this.xylist[i];
    },
    handleColor(i) {
      return {
        "background-color": this.xylist[i].color,
        "border-radius": "10px",
        width: "80%;",
      };
    },
    initThree() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");
      // scene.fog = new THREE.Fog("#eee", 20, 100);

      const canvas = document.querySelector("#three");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(1000, 510);
      renderer.shadowMap.enabled = true;
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = -300;
      camera.position.y = 300;
      camera.position.x = 0;

      const gltfLoader = new GLTFLoader();
      gltfLoader.load("/crank_housing/scene.gltf", (gltf) => {
        console.log(gltf);
        // gltfLoader.load("/seraphine/scene.gltf", (gltf) => {
        let model = gltf.scene;
        //遍历模型每部分
        model.traverse((o) => {
          //将图片作为纹理加载
          let explosionTexture = new THREE.TextureLoader().load(
            // "/seraphine/textures/Mat_cwfyfr1_userboy17.bmp_diffuse.png"
            "crank_housing/textures/material_0_baseColor.jpeg"
          );
          //调整纹理图的方向
          explosionTexture.flipY = false;
          //将纹理图生成基础网格材质(MeshBasicMaterial)
          const material = new THREE.MeshBasicMaterial({
            map: explosionTexture,
          });
          //给模型每部分上材质
          o.material = material;
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        scene.add(model);
      });

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      //光源等位置
      dirLight.position.set(-10, 8, -5);
      if (this.threeType == 0) {
        scene.add(new GridHelper(350, 10));
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
      }
      animate();

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var canvasPixelWidth = canvas.width / window.devicePixelRatio;
        var canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      const geometryIn = new THREE.SphereGeometry(5);
      const materialIn = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      let sphereInter = new THREE.Mesh(geometryIn, materialIn);
      sphereInter.visible = false;
      scene.add(sphereInter);

      function between(a, b, c) {
        if (a >= b && b >= c) return true;
        else if (a <= b && b <= c) return true;
        else return false;
      }

      let x1 = Number.MIN_SAFE_INTEGER;
      let y1 = Number.MIN_SAFE_INTEGER;
      let z1 = Number.MIN_SAFE_INTEGER;
      let x2 = Number.MAX_SAFE_INTEGER;
      let y2 = Number.MAX_SAFE_INTEGER;
      let z2 = Number.MAX_SAFE_INTEGER;

      // let xylist = [];

      let init = 0;
      addEventListener("click", (event) => {
        // const { offsetX, offsetY } = event;
        // const x = (offsetX / window.innerWidth) * 2 - 1;
        // const y = -(offsetY / window.innerHeight) * 2 + 1;
        /**
         * 为了解决在div非铺满body width 情况下的坐标偏移
         */
        let getBoundingClientRect = canvas.getBoundingClientRect();
        // 屏幕坐标转标准设备坐标
        let x =
          ((event.clientX - getBoundingClientRect.left) / canvas.offsetWidth) *
            2 -
          1; // 标准设备横坐标
        let y =
          -((event.clientY - getBoundingClientRect.top) / canvas.offsetHeight) *
            2 +
          1; // 标准设备纵坐标
        const mousePoint = new Vector2(x, y);

        const raycaster = new Raycaster();
        // 设置鼠标位置和参考相机
        raycaster.setFromCamera(mousePoint, camera);
        // 鼠标点击对应的物体（所有鼠标映射到的物体，包括被遮挡的）
        let cube;
        const intersects = raycaster.intersectObjects(scene.children, true);
        // console.log(intersects);

        if (intersects.length > 0 && intersects[0].point != null) {
          sphereInter.visible = true;
          sphereInter.position.copy(intersects[0].point);
          console.log(
            intersects[0].face,
            intersects[0].faceIndex,
            intersects[0].point.x
          );
          if (this.threeType == 0) {
            if (init == 0) {
              //....
              x1 = intersects[0].point.x;
              y1 = intersects[0].point.y;
              z1 = intersects[0].point.z;
              init = 1;
            } else if (init == 1) {
              //....
              init = 0;
              x2 = intersects[0].point.x;
              y2 = intersects[0].point.y;
              z2 = intersects[0].point.z;
              const selectCube = new THREE.BoxGeometry(
                Math.abs(x1 - x2),
                Math.abs(y1 - y2),
                Math.abs(z1 - z2)
              );
              const selectCube2 = new THREE.BoxGeometry(
                Math.abs(x1 - x2),
                Math.abs(y1 - y2),
                Math.abs(z1 - z2)
              );
              let color =
                "#" + Math.floor(Math.random() * 10000000).toString(16);
              const selectCubeMaterial = new THREE.MeshBasicMaterial({
                color: color,
                opacity: 0.4,
                transparent: true,
              });
              //为了生成边界
              const edgeSelectCubeMaterial = new THREE.MeshBasicMaterial({
                color: color,
                opacity: 1,
                transparent: true,
                wireframe: true,
              });

              cube = new THREE.Mesh(selectCube, selectCubeMaterial);
              let cube2 = new THREE.Mesh(selectCube2, edgeSelectCubeMaterial);
              cube.name = "select";
              cube.position.x = (x1 + x2) / 2;
              cube.position.y = (y1 + y2) / 2;
              cube.position.z = (z1 + z2) / 2;
              scene.add(cube);
              cube2.name = "select";
              cube2.position.x = (x1 + x2) / 2;
              cube2.position.y = (y1 + y2) / 2;
              cube2.position.z = (z1 + z2) / 2;
              scene.add(cube2);

              console.log(cube);
              this.xylist.push({ color, x1, x2, y1, y2, z1, z2 });
              console.log(this.xylist);
            }
          } else if (this.threeType == 1) {
            let x = intersects[0].point.x;
            let y = intersects[0].point.y;
            let z = intersects[0].point.z;
            console.log("查看模式点击", x, y, z);
            this.xylist.forEach((v, i) => {
              if (
                between(v.x1, x, v.x2) &&
                between(v.y1, y, v.y2) &&
                between(v.z1, z, v.z2)
              ) {
                console.log(i, this.xylist[i]);
              }
            });
          }
        } else {
          sphereInter.visible = false;
        }
      });
    },
  },
};
</script>

<style>
#three {
  left: 0;
  top: 0;
}
.three-container {
  display: flex;
}
.three-container-left {
  width: 70%;
  background-color: white;
  border-radius: 10px;
}
.three-container-left-down {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.three-container-right {
  width: 30%;
  background-color: white;
  margin-left: 10px;
  border-radius: 10px;
}
.select-container {
  display: inline;
}
.select-container-left {
  height: 20px;
  border-radius: 10px;
}
</style>
