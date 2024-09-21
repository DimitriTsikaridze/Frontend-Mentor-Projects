import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "createdAt",
})
export class CreatedAtPipe implements PipeTransform {
  transform(value: string | null): string | null {
    const date = value?.replace(",", "").split(" ") || ""
    const formattedDate = [...[date[1], date[0], date[2]]].join(" ")

    return formattedDate
  }
}
