import { ResolveFn } from "@angular/router"

export const countryNameResolver: ResolveFn<string> = (route, state) => {
  return route.paramMap.get("countryName") || "Country"
}
