import { InjectionToken } from 'src/core/injector/injection-token';
export const testInjectionToken = new InjectionToken('test');
const colorArray = ['red', 'green', 'blue', 'orange', 'violet'];
export const getColorArray = (index) => {
    return colorArray[index % colorArray.length];
};
export const getColorArrayTemp = (index) => {
    return { color: colorArray[index % colorArray.length] };
};
//# sourceMappingURL=reactive-test.constants.js.map