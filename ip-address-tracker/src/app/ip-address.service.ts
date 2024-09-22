import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IpAddressService {
  private http = inject(HttpClient);

  defaultInfo = {
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      timezone: "-07:00",
    },
    domains: [
      "mail.agropress.ru",
      "nas.ccnut.cn",
      "spamtitan.medonecapital.com",
      "cannibalpandastudios.com",
      "gna970d562b3.ev123.com",
    ],
    as: {
      asn: 15169,
      name: "GOOGLE",
      route: "8.8.8.0/24",
      domain: "https://about.google/intl/en/",
      type: "Content",
    },
    isp: "Google LLC",
  };

  getIpInfo(ip: string) {
    return this.http.get(
      `https://geo.ipify.org/api/v2/country?apiKey=at_1oodhldrUPlKKSSveMLfrEM9tqQzF&ipAddress=${ip}`
    );
  }
}
