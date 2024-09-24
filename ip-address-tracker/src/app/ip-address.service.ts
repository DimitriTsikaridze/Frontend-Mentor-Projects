import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { tap } from "rxjs";
import { IPAddressInfo } from "./ip-address.model";

@Injectable({
  providedIn: "root",
})
export class IpAddressService {
  private http = inject(HttpClient);

  ipInfo = signal<IPAddressInfo>({
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 32.69922,
      lng: -117.11281,
      postalCode: "",
      timezone: "-07:00",
      geonameId: 5375481,
    },
    domains: [
      "attlfellner.eu",
      "carnationmalaysia.com.my",
      "champsalize.com",
      "fegosofa.com",
      "junce.site",
    ],
    as: {
      asn: 15169,
      name: "GOOGLE",
      route: "8.8.8.0/24",
      domain: "https://about.google/intl/en/",
      type: "Content",
    },
    isp: "Google LLC",
  });

  setIpInfo(ip: string) {
    return this.http
      .get<IPAddressInfo>(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_1oodhldrUPlKKSSveMLfrEM9tqQzF&ipAddress=${ip}`
      )
      .pipe(tap((info) => this.ipInfo.set(info)));
  }
}
