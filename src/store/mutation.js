export default {
    saveUsername (state,username) {
        state.username = username;
    },
    saveCartProduct (state,cartCount) {
        state.cartCount = cartCount;
    },
    saveUnitPro (state,unitPro) {
        state.unitPro = unitPro;
    }
}