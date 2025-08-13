import { InjectionToken } from 'src/core/injector/injection-token';

export const TestInjectionToken = new InjectionToken('test');

const colorArray = ['red', 'green', 'blue', 'orange', 'violet'];

export const getColorArray = (index: number) => {
    return colorArray[index % colorArray.length];
};

export const getColorArrayTemp = (index: number) => {
    return { color: colorArray[index % colorArray.length] };
};
