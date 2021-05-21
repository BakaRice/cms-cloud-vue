<template>
  <h1 style="color: red">TODO 后端接口开发并接入数据</h1>
  <div>
    <div class="container">
      <div class="headcard">
        <div class="headcard-shop">
          <img
            src="@/assets/dongfengfengguang.png@70w_70h_100Q.png"
            alt="图标"
          />
          <h1>东风（十堰）有色铸件有限公司</h1>
        </div>
        <div class="headcard-juese">
          <h1>
            <span>登录账号</span>
            <a href="">{{ user.name }}</a>
          </h1>
          <h1>
            <span>登录角色</span>
            <a href="">{{ roleName }}</a>
          </h1>
        </div>
        <div class="headcard-time">
          <h1>本次登录时间：2021-05-15 10:15:17</h1>
          <h1>本次登录IP地址：118.203.120.65</h1>
        </div>
        <div class="headcard-time">
          <h1>上次登录时间：2021-05-15 10:15:17</h1>
          <h1>上次登录IP地址：118.203.120.65</h1>
        </div>
      </div>
      <div class="container-btn">
        <div class="container-btn-item">
          <img
            src="data:image/png;base64,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"
          />
          <h1>查看工单</h1>
        </div>
        <div class="container-btn-item">
          <img
            src="data:image/png;base64,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"
          />
          <h1>查看洗车单</h1>
        </div>
        <div class="container-btn-item">
          <img
            src="data:image/png;base64,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"
          />
          <h1>查看销售单</h1>
        </div>
        <div class="container-btn-item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABzlBMVEUAAAD/vyD/3yD3wR/3yR/3uxb3wxb3wx73yh7/yh71whv4xRv4yR/yvBT1vBf1vxf1vxv4yR73xhzzuRTzuxTzvRb1vxj3wxr3xRr5yRz5yR75yx72wxr2xBv2xhv2xx34xx3yuRTyvBX0vRj1wBj4xxz4yR74yh7xtxTxuhXyvBbzvhf1wRj1wxn3xBz3xh34xh34yB34yR74yh7yuRTzuxbzvRb0vxj1wBn2wxv3xRz3xh33xx34yB75yR/rqgvrqwvrqwzrrAzsqwzsrAzsrA3srQzsrQ3srg3trQ3trg3trg7trw7tsA7tsA/tsQ/usA/usQ/usRDusg/ushDusxDvshDvsxDvsxHvtBHvtRHvtRLvthLwtBHwtRLwthLwthPwtxLwtxPwuBPxtxPxuBPxuBTxuRPxuRTxuhTxuhXyuRTyuhTyuhXyuxXyuxbyvBXyvBbyvRbzvBbzvRbzvRfzvhbzvhfzvxfzvxjzwBj0vhf0vxf0vxj0wBj0wRj0wRn0whn1wRn1whn1whr1wxr1xBr1xBv1xRv2wxr2xBr2xBv2xRv2xhv2xhz2xxz3xhz3xxz3xx33yBz3yB33yR34yB34yR34yR7///8rHe4sAAAAP3RSTlMACAghISIiIiIiS0tLTExMTEx+f39/f39/f39/srKysrKzs7Ozs7Oz3d3d3d3d3d3d3d3d9/f39/f39/f39/e6X5dSAAAFqElEQVRYw9WY6XcSZxTG1WpXu2j3fd/32t1ak4YKsqSQQFhiGZlk6BAFGRlL0gSYMGFawxKwRO1/2+fedzh60nGEMV9Kvv/Os9z3OXNy4MD/8Xf41VcO7wPm0PGTnc73xw/dK+foZ51Ot9O2Pnnk3ly91u31O51Ou221Xvbu79DzJ/tdYKx2u2W1W98959Hf0U+73V6n12l3rO12q2W2zI8f9uSq1+934etPGGvRb9M0jZfum9TVCz8MkA4Za1uWBYyJn9Gsf/vsRP6Ofd4bDLqkBwFZ29vgbG0Zhmk0jPpHT4yNefDtncGgR/GIoCkfGDOajbpRr9dX33pgzK5OEabfJQ5ArdZVNmY0jXqTOKu1b545OIarL4Y713rw1ekhZmvbIj2QYxhMqddqteq6/uHjd3P1zmDIeugO2wRqbZOcraZJroBZra1W8dPfvN+1q1Pg9AZ9SvkvkEBBOlvw1WjUERAoterv4FzWtK+fPujiCnIG5GuUD4FM9NWENXJWWyU9l3Vdr1S0Dx67g6sbkDPc6fVEYZbFd2hu4q9B+YCzUa1V9ap+RdM1rVS6tPLGkf+6evFHyLmGmAd9lkMPg895a8ts0P1QPqsb5Is4Fa1SKq0Uv3pqj79jJ4AZUj492xZhrsKWaYCD5teod6LoOpyBAkypoBbef/Q2zEPvDm8MryMfCOqL/cGfyAc5w9cf9VodmHXOWdfKJTgrFYpFtagqrx+55Wp3d0jGdugMR/sj8jGaJudMdW1QPgioUimXmVNQ6ad8+aTwd2J398ZweH1Ahd2+P/xS0XuD66LzgSCkrJXLpKdIglR1SVFk+T0G7d4kDN3z3v3ZRD6Ix1gjEgmiviplDgiCSM6SqshKTmbQTQjie3bYH5PPBzlvVOkQAdLKWvlSqWhzVOhR5GWJQRQP8nHeH7zTNbwuKkzHIWroXcRcQECKurSUl3M56dwIRL3faX/omVLvwEBPhfui3ou/kR7IycmyUPT3cOC+P4RZ169Azygezhl6YAsUSVocge6yP1V+7zrdc0nDHa7Y+Szll5GPdF6yMxpjf/idIuYS+yJOPq9CT471SBkGjbc/V2CMXupKie7wAkgwhnygJ5vZZ9CYQ1am914qoLCLFA/uR5ElcpbJLmZt0JhDRvnggNSLVHxeWZYZlM1k02kBGn/IRg+VmpepMCSdyaQzAjTJkBXVwsUL6lJeUZYVWfjKZjMjRRMNGb+vvCj+PDigpG3QpEOmoK/csjwSBEwqIUCTDhktUE6SziGfLOtJJwXIYcj+cfkpFDOftCRAiaQAOQ2ZG4iGDIVlpMV0mhJKpuK2Iochc1fEvUuZxWz6V+hJJZNxBjkNmRuIhgz3w4eYSKaT8Xg8JkAOQ+YKor5EXRRQKh5fEIqchswNxMMhZSieBAU9H48JRV6GLMN9pdLIeT6+MAJ5GDJRe4ryQUJzszZo8v0hUDKRSsUX5hfmYrEog7zsD+shQQjol5htzcv+8LtIJCGIQJGIAHnYn3QymaCcY/HYbGw2GmaQl/1J0cOArzj5ioZtRR72J50gzAJRoCcswnbaH7eDpP1BPEncIQqLRcIgMchpf9xBSIjOh/KJRIGxQU4fUq6gBHEWhKBZUII2yOlDyg1E+0OFzaH2KPkKB0IC5PAh5QZKCWPwBWPkKxQKMMjpQ8oNxPEwKELGwoFA0M+gcT6k9u4PvYsIFY+AgsHQWQaN8yG1d3/m5maj7CsYCvmD/jO3QBPuT2yUTzDkB8i25mF/UBiDAsFAMHjG7xOKPOxPLBqNcNBkzO8TIC/7w5RwCH0F/b4RyMv+zIp8IAh6/D9NC5CH/UE+aN0f8J/10W9KgDzsDwtCOuD4f/ZNzTDIy/5wPHY+vulpARrn+2fv/gQQUJDz8U1PzUydFqAxvn/27k+IHpj/DAc0PTNzev/+o/cvmmr1PN5ksUUAAAAASUVORK5CYII="
          />
          <h1>查看库存</h1>
        </div>
        <div class="container-btn-item">
          <img
            src="data:image/png;base64,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"
          />
          <h1>查看本地商品</h1>
        </div>
      </div>
      <div class="container-contant">
        <div class="container-contanl-left">
          <div class="container-contanl-left1">
            <h1 style="margin-bottom: 0px; margin-top: 0px">库存数据统计</h1>
            <ul>
              <li>
                <h2>142</h2>
                <h3>当前库存商品种类数</h3>
              </li>
              <li>
                <h2>42350</h2>
                <h3>当前库存总数</h3>
              </li>
              <li>
                <h2>673</h2>
                <h3>当前占用库存数</h3>
              </li>
              <li>
                <h2>7306</h2>
                <h3>当前仓库可用库存</h3>
              </li>
            </ul>
          </div>
          <div class="container-contanl-left1" style="margin-top: 24px">
            <h1>营业待收/待付统计</h1>
            <ul>
              <li>
                <h2>14103647.02</h2>
                <h3>当前营业未收款合计金额(元)</h3>
              </li>
              <li>
                <h2>953847.50</h2>
                <h3>当前营业未付款合计金额(元)</h3>
              </li>
            </ul>
          </div>
        </div>
        <div class="container-contanl-right">
          <h1>快速新建</h1>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAgVBMVEUAAAAMhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQNe/INfPIMfPMLffEMevMMfPELfPIMevIMe/IMevIMevELe/ELe/IMevIMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevEke5Y1AAAAKnRSTlMAFRkdHiInKCwtMjg+P0BFRk1QVFx/gIjA0tXb4OTo6ezv8PP19vj6/P3sgrmtAAAAvklEQVQ4y9XU2w6CMAwG4IriARTPEwUERVH/939Ab1xkUm0vMMbebfmSrt06ou+HtzavEXGul6ARhnF+ChUcZEC1cfLGHBzlwGnq7hkGBgVQjkmE4RE4hCTCSQkUAYlwdgb2QxLhvAKyPolweQFSn0S4ugJJl0S4uAE7j2RogG2HdPCxsBcnQvsO2oPq1OpifgjrQ6Bqz7NFahjV5/pTanHS2O3/hPbbid36m9D9ztqA6tTvi4mZy2Mhd6Y6vAOYUj/Fco276wAAAABJRU5ErkJggg=="
            />
            <span>新建工单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA1VBMVEUAAAD///9/f/8cjv8Uif8MhvMVf/QUevUSe/YRf/YPfPcPf/cNfPINgPIMgPMLffQQffQPevUPffUOe/ENffIMe/MMffMMfPMMfvMLfvQPfPQNe/INfPIMfPMLe/QLffEMevILe/ILfPIMevMMevMMfPELfPINe/IMe/ELe/IMe/ELe/EMe/IMevIMevIMe/ILe/EMe/IMevIMe/IMevELe/ELe/IMevIMe/IMevIMe/EMevEMe/EMe/ELevELe/ELevILevILe/ILevILevILe/ILevFSCqBSAAAARnRSTlMAAQIJDRUYGR0eISInKCwtLzIzOD0+P0BBRUZNUFRZXGZyc3t/gIiNl5ymub3AxsfN0tXY2+Dk6Ons7/Dx8/T19vj5+vz9q7OvhQAAASpJREFUOMu91MlSAkEMgOEwIAgjyqago8jWsi/KogiDLPq//yN5UJTBmW4Oam5JfVXpVHUish+xmtqPvPhEfMSPUD7OHnMQTE5gdefp2/WDZ0/wcumtKR+YnoJ7LkaYncFzVozwwoVpWozwagmPp2KEzgomJ2KENxsY22KEt68wOt5m0WgQvH6Dh9g2szodKwAquD/6yqpQDYbfSWYDm4wZhocAw7ARKpjNoGaC8SWUSrCMG2ADeqFQDxp6GHEhJ5IDN6KFDgxERAbgaGEF6iIidahoYRFaIiItKGphEtYpkdQakvqp27BoNhfQ/izkd/d6BybmHys6T5j+nN0H6Nu+6+KpWIVyuWCJGerK/wG3Z6erlFJKA73n7Dfgwa2Dh+nuHk8d9HvT38J3yAR9Dt1SnGEAAAAASUVORK5CYII="
            />
            <span>新建洗车单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAgVBMVEUAAAAMhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQNe/INfPIMfPMLffEMevMMfPELfPIMevIMe/IMevIMevELe/ELe/IMevIMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevEke5Y1AAAAKnRSTlMAFRkdHiInKCwtMjg+P0BFRk1QVFx/gIjA0tXb4OTo6ezv8PP19vj6/P3sgrmtAAAAsElEQVQ4y+XUyw6CMBAF0BHFByi+xyqgKIp6//8DXZFQHDuNcaPeVdOepG3aGaJ2gjW3k5CQXoqnsODCDF5wkAPVxtrXSHB0AM5Te44FGBVAOSYVxifgGJMKJyVQRKTC2QXYD0mF8wrI+6TC5RXIQlLh6gakXVLh4g7sAnnZggxsO+QHmb4G1qN/h0mzrl1QrTTlHX4S1v3JMDO7/qPd9z4Bvbd+fRnT7LIuKJ3pLfgAdJhE0XEDikEAAAAASUVORK5CYII="
            />
            <span>新建销售单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAArlBMVEUAAAAqf/8NhvIMhvMUevUSe/YRf/YPf/cPfPgNfPINgPIMgPMLffQPevUOe/ENe/IMe/MMffMMfPMMfvMLfvQPfPQNe/INfPIMfPMLffENfPIMevMMfPEMe/ILfPILfPIMe/IMevILe/IMe/EMevILe/IMe/IMevIMevELe/ELevILe/IMevIMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevILevF1kIKSAAAAOXRSTlMABhMVGR0eIiMnKCwtMjg6Pj9AQUVGTVBUXGV/gIWGiLCxs7vA0NLV2+Dj5Ojp7O/w8/X2+Pr8/f4my3L6AAAA8klEQVQ4y83UZw+CMBAG4LonDtyKG/cEcbz//49ZiJqiR0vUGO9T7/Ik1wtHGXs74h3jOXTKJed4CYNwqQVCwewKcPq+viYF8xvArvprBgG1LWCVmBIW9sCuwJSwbAFbjSlh7QCsc0wJ6w6wyjAlbB6BRYof2l03TY+iNGydgHnCdRf0uFtiEqVg4wzM4u5pwD9EjzvYRQryZBrzTpEhl3x8u8IC4D3xpOACoScFFwT5FnRtjL11kEJxu34Mb6tqKu+oyN6AoVt/MLUuPgCy1pItfmSv/9XfQEmZqIjjGxLof/e+AUO3Dh7GFF9ZGaTuJMIrUn1oQ4V4wzIAAAAASUVORK5CYII="
            />
            <span>新建采购单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
            />
            <span>新建盘点单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
            />
            <span>添加员工</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
export default defineComponent({
  computed: {
    ...mapState(["user"]),
    ...mapState(["roleName"]),
  },
});
</script>

<style>
ul {
  list-style: none;
}
h1 {
  display: block;
  font-size: 1em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: inherit;
}
.container .headcard .headcard-juese h1 span {
  width: 72px;
  height: 28px;
  display: inline-block;
  text-align: center;
  line-height: 28px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background: #f5f5f5;
  border-radius: 4px;
}
.container .headcard .headcard-shop h1 {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-left: 12px;
}
.container .headcard .headcard-time h1 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 38px;
}
.container .headcard .headcard-juese h1 a {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  margin-left: 12px;
}
.container {
  background: #f5f5f5;
  padding: 0;
}
.container .headcard {
  display: flex;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
  padding: 32px 0;
  justify-content: space-around;
  text-align: start !important;
}
.container .headcard .headcard-shop {
  display: flex;
  align-items: center;
}

/* .container-btn */
.container .container-btn {
  display: flex;
  margin: 24px 0;
  justify-content: space-between;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.container .container-btn .container-btn-item {
  width: 18%;
  height: 84px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .container-btn .container-btn-item img {
  width: 36px;
  height: 36px;
}
.container .container-btn .container-btn-item h1 {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000;
  margin-left: 12px;
}
.container .container-contant .container-contanl-left {
  width: 70%;
}
.container .container-contant .container-contanl-left .container-contanl-left1 {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.container .container-contant {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.container .container-contant h1 {
  line-height: 60px;
  padding-left: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  border-bottom: 1px solid #f1e7e7;
  position: relative;
}
.container
  .container-contant
  .container-contanl-left
  .container-contanl-left1
  ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 48px 0;
}
.container .container-contant .container-contanl-right {
  width: 28%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
}
.container .container-contant h1 {
  line-height: 60px;
  padding-left: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  border-bottom: 1px solid #f1e7e7;
  position: relative;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link
  img {
  width: 20px;
  height: 20px;
  margin: 0 12px 0 24px;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
</style>
