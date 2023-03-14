import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, args: [number, string?]) {
        return value.substring(0, args[0]) + args[1] || '';
    }
}