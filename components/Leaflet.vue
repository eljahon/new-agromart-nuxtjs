<template>
  <div style="position: relative">
    <div id="leaflet" :style="height" class="w-full" />
    <button
      v-if="drawEnabled"
      type="submit"
      class="
        mt-4
        py-2
        px-4
        border border-transparent
        rounded-md
        shadow-sm
        text-sm
        font-medium
        text-white
        bg-red-600
        hover:bg-red-700
        focus:outline-none
        p-2
        leading-4
      "
      @click="toDrawDisable()"
    >
      {{ $t("word.cancel") }}
    </button>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import parse_georaster from "georaster";
import landModal from "~/modals/land.vue";
export default {
  name: "Map",
  props: {
    height: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      polygon: null,
      current: {
        layer: null,
        coords: null,
        drawer: null,
      },
      drawEnabled: false,
    };
  },
  created() {
    if (process.browser) {
      window.L = require("leaflet");
      require("leaflet-draw/dist/leaflet.draw");
    }
  },
  mounted() {
    this.renderMap()
  },
  methods: {
    renderSelectedArea() {
      const latlngs = this.selectedArea.field.polygon.polygon[0];
      const polyline = window.L.polyline(latlngs, { color: "red" }).addTo(
        this.map
      );
      this.map.fitBounds(polyline.getBounds());
    },
    toDrawDisable() {
      this.current.drawer.disable();
      this.drawEnabled = false
      this.$router.push({
        path: this.localePath("/my-profile/lands"),
      })
    },
    toDrawEnable() {
      this.current.drawer = new window.L.Draw.Polygon(this.map, {
        allowIntersection: false,
        drawError: {
          color: "#ff0000",
          message: this.$t("text.youCantDrawThat"),
        },
        shapeOptions: {
          color: "#00ff23",
        },
      });
      this.current.drawer.enable();
      this.drawEnabled = true
    },
    async renderMap() {
      const L = window.L;
      this.map = L.map("leaflet", {
        center: [40.4446, 71.303996],
        zoom: 17,
      });
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoib3liZWsxMDI0IiwiYSI6ImNsMHRoeDl0MzBsemEzYm5taHp6ZnB0ZGoifQ.Vs11zDgh6BCosFToZjqCGQ",
        {
          attribution:
            'Geo Analytics by &copy; <a href="https://www.agromart.uz/" target="_blank">Agromart</a> ©Copyright All rigths reseved.',
        }
      ).addTo(this.map);
      const editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);
      const options = {
        position: "topright",
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
              color: "#bada55",
            },
          },
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: editableLayers, // REQUIRED!!
          remove: true,
        },
      };
      const drawControl = new L.Control.Draw(options);
      this.map.addControl(drawControl);
      const _this = this;
      this.map.on("draw:created", function (e) {
        const layer = e.layer;
        _this.current.layer = layer;
        _this.current.coords = layer._latlngs;
        editableLayers.addLayer(layer);
        const _area = window.L.GeometryUtil.geodesicArea(layer._latlngs[0]);

        const _stArea = (_area / 10000).toString().split(".");
        const _filteredArea = parseFloat(
          _stArea[0] + "." + _stArea[1].slice(0, 2)
        );
        const _one = layer._latlngs[0][Math.ceil(layer._latlngs[0].length / 2)];
        const _center = [_one.lat, _one.lng];
        const _coords = [layer._latlngs[0].map((e) => [e.lat, e.lng])];
        if (_coords[0][0] !== _coords[0][_coords[0].length - 1]) {
          _coords[0].push(_coords[0][0]);
        }
        const _box = {
          zoom: e.target._zoom,
          center: _center,
          polygon: _coords,
        };
        _this.openLandModal({ polygon: _box, area: _filteredArea });
      });
    },
    remover(layer) {
      this.map.removeLayer(layer);
    },
    removeCurrentPolygon() {
      this.remover(this.polygon);
      this.remover(this.current.layer);
    },
    polygonCreator(coords) {
      if (this.polygon) {
        this.remover(this.polygon);
      }
      this.polygon = window.L.polygon(coords, { color: "#2e00ff" });
      this.polygon.addTo(this.map);
    },
    renderPolygon(polygon) {
      this.map.flyTo(polygon.center, 15, { duration: 4 });
      this.polygonCreator(polygon.polygon);
      this.polygon = window.L.polygon(polygon.polygon, { color: "red" });
      this.polygon.addTo(this.map);
    },
    openLandModal(data) {
      this.$modal.show(
        landModal,
        { data },
        {
          height: "auto",
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 10 : 600,
          acrollable: true,
        }
      );
    },
    addNewField() {
      this.$router.push({
        query: { field_id: "new" },
      });
      this.current.drawer = new window.L.Draw.Polygon(this.map, {
        allowIntersection: false,
        drawError: {
          color: "#ff0000",
          message: "<strong>Oh snap!<strong> you can't draw that!",
        },
        shapeOptions: {
          color: "#00ff23",
        },
      });
      this.drawEnabled = true;
      this.current.drawer.enable();
    },
  },
};
</script>
<style>
.yandexMap {
  height: 100vh;
  width: 100%;
}
#newField {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}
</style>
