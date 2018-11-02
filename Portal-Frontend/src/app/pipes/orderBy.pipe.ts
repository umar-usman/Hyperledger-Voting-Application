import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    static compare(reverse: boolean, a: any, b: any): number {
        if (a < b && reverse === false) {
            return -1;
        }
        if (a > b && reverse === false) {
            return 1;
        }
        if (a < b && reverse === true) {
            return 1;
        }
        if (a > b && reverse === true) {
            return -1;
        }
        return 0;
    }

    transform(input: any[], config?: string | string[]): any {
        if(!input) {
            return input;
        }

        if (config === '+' || config === '-') {
            return config === '+' ? input.sort() : input.sort().reverse();
        }

        if (Array.isArray(config) === false) {
            config = <string[]>[config];
        }

        // As soon as a or b is smaller/greater than the other, we can immediately return
        return input.sort((a: any, b: any): number => {
            for (let fullProp of config) {
                let reverse = fullProp[0] === '-';
                let prop = fullProp.substr(1);

                // Is it a subobject?
                if (prop.indexOf('.') > 0) {
                    let first = prop.split('.')[0];
                    let last = prop.split('.')[1];

                    let result = OrderByPipe.compare(reverse, a[first][last], b[first][last]);
                    if (result !== 0) {
                        return result;
                    }

                    continue;
                }

                let result = OrderByPipe.compare(reverse, a[prop], b[prop]);
                if (result !== 0) {
                    return result;
                }
            };

            return 0;
        });
    }
}