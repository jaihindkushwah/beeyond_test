import type { IPartners } from "@/@types/auth";
import { useEffect, useState } from "react";
import lodash from "lodash";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminService } from "@/services/admin.service";
import { getDataFromSessionStorage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mail, Hash } from "lucide-react";

const PartnerCard = ({ partner }: { partner: IPartners }) => {
  return (
    <Card className="w-full px-5 max-w-xl shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 hover:scale-[1.02] group">
      <CardContent className="p-6 ">
        <div className="flex items-start gap-10  justify-center">
          <div className="relative">
            <Avatar className="w-16 h-16 ring-2 ring-white shadow-md">
              <AvatarImage
                src={partner.avatarUrl || "/placeholder.svg"}
                alt={partner.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                {partner.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                partner.available ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {lodash.capitalize(partner.name)}
                </h2>
                <Badge
                  variant={partner.available ? "default" : "secondary"}
                  className={`mt-1 ${
                    partner.available
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {partner.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">{partner.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Hash className="w-4 h-4" />
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {partner._id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function Partners() {
  const [parnters, setPartners] = useState<IPartners[]>([]);
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const adminService = AdminService.init(
          getDataFromSessionStorage("token")
        );
        const data = await adminService.getAllPartners();
        setPartners(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchPartners();
  }, []);
  return (
    <div className="w-full mt-4 min-h-screen min-sm:px-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partners</h1>
          <p className="text-gray-600 text-sm">View and manage your partners</p>
        </div>
        <div className="space-y-2">
          {parnters.length === 0 && (
            <div className="text-red-500 text-center text-sm font-semibold">
              You have no new orders
            </div>
          )}
          {parnters.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
