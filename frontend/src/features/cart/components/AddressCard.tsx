import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone } from "lucide-react"
import type { IAddress } from "@/@types/order"

interface AddressCardProps {
  address: IAddress
  isSelected: boolean
  onSelect: (address: IAddress) => void
}

export function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
  return (
    <Card
      className={`py-0 cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
      onClick={() => onSelect(address)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{address.street}</span>
              {address.isDefault && (
                <Badge variant="secondary" className="text-xs">
                  Default
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {address.city}, {address.state} {address.zip}
              {address.country && `, ${address.country}`}
            </p>
            <div className="flex items-center gap-2 mt-2 ml-6">
              <Phone className="h-3 w-3 text-gray-400" />
              <span className="text-sm text-gray-500">{address.phone}</span>
            </div>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}
          >
            {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}