export default {
    saveUsername (context,username) {
        context.commit('saveUsername',username);
    },
    saveCartProduct (context,cartCount) {
        context.commit('saveCartProduct',cartCount);
    },
    saveUnitPro (context,unitPro) {
        context.commit('saveUnitPro',unitPro);
    }
}