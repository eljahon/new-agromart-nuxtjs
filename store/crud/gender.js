export const state = () => ({
  loading: false,
  oneLoading: false,
  pending: false,
  deleting: false,
  error: null,
  data: [],
  pagination: {
    page: 1,
    total: 0,
  },
});
export const mutations = {
  ERROR_GENDERS(state, payload) {
    state.error = payload;
  },
  GET_GENDERS(state, payload) {
    state.data = payload;
  },
  LOAD_GENDERS(state, payload) {
    state.loading = payload;
  },
  ONE_LOAD_GENDERS(state, payload) {
    state.oneLoading = payload;
  },
  PENDING_GENDERS(state, payload) {
    state.pending = payload;
  },
  DELETING_GENDERS(state, payload) {
    state.deleting = payload;
  },
  PAGINATION_GENDERS(state, payload) {
    state.pagination = payload;
  },
};
export const actions = {
  // get
  getGenders({ commit }, payload) {
    commit("LOAD_GENDERS", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/genders", { params: payload })
        .then((res) => {
          commit("GET_GENDERS", res);
          resolve(res);
        })
        .catch((error) => {
          commit("ERROR_GENDERS", error);
          reject(error);
        })
        .finally(() => {
          commit("LOAD_GENDERS", false);
        });
    });
  },

  // get id
  getGendersById({ commit }, payload) {
    commit("ONE_LOAD_GENDERS", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/genders/${payload}/`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          commit("ERROR_GENDERS", error);
          reject(error);
        })
        .finally(() => {
          commit("ONE_LOAD_GENDERS", false);
        });
    });
  },

  // post
  postGenders({ commit }, payload) {
    commit("PENDING_GENDERS", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/genders", payload.data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          commit("ERROR_GENDERS", error);
          reject(error);
        })
        .finally(() => {
          commit("PENDING_GENDERS", false);
        });
    });
  },

  // update
  updateGenders({ commit }, payload) {
    commit("PENDING_GENDERS", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$put(`/genders/${payload.id}/`, payload.data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          commit("ERROR_GENDERS", error);
          reject(error);
        })
        .finally(() => {
          commit("PENDING_GENDERS", false);
        });
    });
  },

  // delete
  deleteGenders({ commit }, payload) {
    commit("DELETING_GENDERS", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$remove(`/genders/${payload}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          commit("ERROR_GENDERS", error);
          reject(error);
        })
        .finally(() => {
          commit("DELETING_GENDERS", false);
        });
    });
  },
};
export const getters = {
  loadGenders(state) {
    return state.loading;
  },
  oneLoadGenders(state) {
    return state.oneLoading;
  },
  pendingGenders(state) {
    return state.pending;
  },
  deletingGenders(state) {
    return state.deleting;
  },
  dataGenders(state) {
    return state.data;
  },
  errorGenders(state) {
    return state.error;
  },
  paginationGenders(state) {
    return state.pagination;
  },
};
