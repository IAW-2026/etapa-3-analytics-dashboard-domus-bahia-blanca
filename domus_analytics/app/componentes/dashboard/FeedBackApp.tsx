"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star, ShieldCheck, AlertTriangle } from "lucide-react";
import { getFeedbackAnalyticsData } from "@/app/acciones/feedback.acciones";
import { getAllPropiedadesParaMapaAction } from "@/app/acciones/propiedades.acciones";

export default function FeedbackPanel() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [propertyMap, setPropertyMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [feedbackResult, map] = await Promise.all([
        getFeedbackAnalyticsData(),
        getAllPropiedadesParaMapaAction(),
      ]);

      if (feedbackResult.success && feedbackResult.data) {
        setStats(feedbackResult.data.stats);
        setReviews(feedbackResult.data.reviews);
      }

      setPropertyMap(map);
      setLoading(false);
    }
    load();
  }, []);

  // --- agrupar por propiedad para los rankings ---
  const grouped = reviews.reduce((acc: any, review) => {
    if (!acc[review.targetId]) {
      acc[review.targetId] = { total: 0, count: 0 };
    }
    acc[review.targetId].total += review.rating;
    acc[review.targetId].count += 1;
    return acc;
  }, {});

  const ranked = Object.entries(grouped)
    .map(([targetId, data]: any) => ({
      name: propertyMap[targetId] ?? targetId,
      rating: data.total / data.count,
      reviews: data.count,
    }))
    .sort((a, b) => b.rating - a.rating);

  const topRated = ranked.slice(0, 3);
  const worstRated = ranked.slice(-3).reverse();

  const recentReviews = [...reviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (loading) {
    return <p className="text-domus-textSoft">Cargando...</p>;
  }

  return (
    <div className="space-y-8 animate-fade-up">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-domus-primary">
          Feedback
        </h2>
        <p className="text-domus-textSoft mt-2">
          Supervisión global de reseñas y reputación.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="text-domus-primary" size={22} />
            <span className="font-medium">Total reseñas</span>
          </div>
          <p className="text-4xl font-bold">{stats?.totalReviews ?? 0}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="text-domus-terracota" size={22} />
            <span className="font-medium">Rating promedio</span>
          </div>
          <p className="text-4xl font-bold">{stats?.averageRating?.toFixed(1) ?? "0.0"}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="text-domus-primary" size={22} />
            <span className="font-medium">Respondidas</span>
          </div>
          <p className="text-4xl font-bold">{stats?.reviewsWithResponse ?? 0}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-domus-terracota" size={22} />
            <span className="font-medium">Sin responder</span>
          </div>
          <p className="text-4xl font-bold">{stats?.reviewsWithoutResponse ?? 0}</p>
        </div>

      </div>

      {/* RANKINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="card p-6">
          <h3 className="text-xl font-bold text-domus-primary mb-4">
            Mejor calificadas
          </h3>

          <div className="space-y-3">
            {topRated.length === 0 && (
              <p className="text-domus-textSoft text-sm">Sin datos suficientes.</p>
            )}
            {topRated.map((property, index) => (
              <div key={property.name} className="flex items-center justify-between border-b border-domus-secondary pb-3">
                <div>
                  <p className="font-semibold">#{index + 1} {property.name}</p>
                  <p className="text-sm text-domus-textSoft">{property.reviews} reseñas</p>
                </div>
                <span className="font-bold text-domus-primary">★ {property.rating.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-bold text-domus-terracota mb-4">
            Peor calificadas
          </h3>

          <div className="space-y-3">
            {worstRated.length === 0 && (
              <p className="text-domus-textSoft text-sm">Sin datos suficientes.</p>
            )}
            {worstRated.map((property, index) => (
              <div key={property.name} className="flex items-center justify-between border-b border-domus-secondary pb-3">
                <div>
                  <p className="font-semibold">#{index + 1} {property.name}</p>
                  <p className="text-sm text-domus-textSoft">{property.reviews} reseñas</p>
                </div>
                <span className="font-bold text-red-500">★ {property.rating.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT REVIEWS */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-domus-primary mb-5">
          Últimas reseñas
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-domus-secondary">
                <th className="text-left py-3">Usuario</th>
                <th className="text-left py-3">Propiedad</th>
                <th className="text-left py-3">Rating</th>
                <th className="text-left py-3">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {recentReviews.map((review) => (
                <tr key={review.id} className="border-b border-domus-secondary">
                  <td className="py-4">{review.authorName ?? "Anónimo"}</td>
                  <td className="py-4">{propertyMap[review.targetId] ?? review.targetId}</td>
                  <td className="py-4 font-semibold">★ {review.rating}</td>
                  <td className="py-4 text-domus-textSoft">
                    {new Date(review.createdAt).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentReviews.length === 0 && (
            <p className="text-center text-domus-textSoft py-8">
              No hay reseñas recientes.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}