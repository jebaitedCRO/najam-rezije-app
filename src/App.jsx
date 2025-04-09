
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const [userRole, setUserRole] = useState("stanar");
  const [rentPaid, setRentPaid] = useState(false);
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ type: "", amount: "", date: "", file: null });

  const handleAddBill = () => {
    if (!newBill.type || !newBill.amount || !newBill.date) return;
    setBills([...bills, newBill]);
    setNewBill({ type: "", amount: "", date: "", file: null });
  };

  const currentMonth = new Date().toISOString().slice(0, 7);
  const filteredBills = bills.filter((bill) => bill.date.startsWith(currentMonth));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Tabs defaultValue="stanar" onValueChange={setUserRole} className="w-full">
        <TabsList>
          <TabsTrigger value="stanar">Stanar</TabsTrigger>
          <TabsTrigger value="vlasnik">Vlasnik</TabsTrigger>
        </TabsList>

        <TabsContent value="stanar">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-bold">Unos režije</h2>
              <div className="space-y-2">
                <div>
                  <Label>Vrsta režije</Label>
                  <Input
                    value={newBill.type}
                    onChange={(e) => setNewBill({ ...newBill, type: e.target.value })}
                    placeholder="npr. Struja"
                  />
                </div>
                <div>
                  <Label>Iznos (EUR)</Label>
                  <Input
                    type="number"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Datum</Label>
                  <Input
                    type="date"
                    value={newBill.date}
                    onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Upload računa</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setNewBill({ ...newBill, file: e.target.files?.[0] || null })
                    }
                  />
                </div>
                <Button onClick={handleAddBill}>Dodaj režiju</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vlasnik">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-bold">Najamnina</h2>
              <div className="flex items-center space-x-4">
                <span>Status: {rentPaid ? "Plaćeno" : "Nije plaćeno"}</span>
                <Button onClick={() => setRentPaid(!rentPaid)}>
                  {rentPaid ? "Označi kao neplaćeno" : "Označi kao plaćeno"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-bold">Režije za {currentMonth}</h2>
              {filteredBills.length === 0 ? (
                <p>Nema unesenih režija za ovaj mjesec.</p>
              ) : (
                <ul className="space-y-2">
                  {filteredBills.map((bill, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <div>{bill.type} ({bill.date})</div>
                        <div className="text-sm text-gray-500">{bill.amount} €</div>
                      </div>
                      {bill.file && (
                        <a
                          href={URL.createObjectURL(bill.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline text-sm"
                        >
                          Pogledaj račun
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

