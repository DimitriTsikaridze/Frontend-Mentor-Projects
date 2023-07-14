import { ResolveFn } from "@angular/router"

export const countryNameResolver: ResolveFn<string> = (route) => {
  return route.paramMap.get("countryName") || "Country"
}
