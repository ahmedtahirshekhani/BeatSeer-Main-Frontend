export function formatTrendsHtml(trends) {
    return trends.map(trend => {
        return `
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Top Genres:</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.top5_upward_genres.map(
                genre => `
                  <li style="margin-bottom: 5px; font-size: 14px;">
                    <span style="font-weight: bold;">${genre.genre}</span> 
                    <span style="color: #27ae60;">${genre.trending_percent}%</span>
                  </li>`
              ).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Downward Genres:</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.top5_downward_genres.map(
                genre => `
                  <li style="margin-bottom: 5px; font-size: 14px;">
                    <span style="font-weight: bold;">${genre.genre}</span>
                    <span style="color: #c0392b;">${genre.trending_percent}%</span>
                  </li>`
              ).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Top Artists:</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.top5_upward_artists.map(
                artist => `
                  <li style="margin-bottom: 5px; font-size: 14px;">
                    <span style="font-weight: bold;">${artist.artist}</span>
                    <span style="color: #27ae60;">${artist.trending_percent}%</span>
                  </li>`
              ).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Downward Artists:</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.top5_downward_artists.map(
                artist => `
                  <li style="margin-bottom: 5px; font-size: 14px;">
                    <span style="font-weight: bold;">${artist.artist}</span>
                    <span style="color: #c0392b;">${artist.trending_percent}%</span>
                  </li>`
              ).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Emerging Artists:</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.top_5_emerging_artists.map(artist => `
                <li style="margin-bottom: 10px; font-size: 14px;">
                  <b style="font-size: 16px; color: #2980b9;">${artist.artist}</b>
                  <br><span style="color: #34495e;">Social Growth:</span> ${artist.social_growth}%
                  <br><span style="color: #34495e;">Monthly Streams:</span> ${artist.monthly_streams}
                  <br><span style="color: #34495e;">Engagement:</span> ${artist.engagement}
                </li>
              `).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Established Artists for Film (Next 18 Months):</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.established_artists_for_film.map(artist => `
                <li style="margin-bottom: 10px; font-size: 14px;">
                  <b style="font-size: 16px; color: #2980b9;">${artist.name}</b>
                  <br><span style="color: #34495e;">Projected Growth:</span> ${artist.projected_growth}%
                  <br><span style="color: #34495e;">Genre:</span> ${artist.genre}
                  <br><span style="color: #34495e;">Genre Compatibility:</span> ${artist.genre_compatibility}
                </li>
              `).join("")}
            </ul>
            <h3 style="color: #2c3e50; font-family: Arial, sans-serif; margin-bottom: 10px;">Emerging Artists for Film (Next 18 Months):</h3>
            <ul style="list-style-type: none; padding: 0; margin-bottom: 20px;">
              ${trend.emerging_artists_for_film.map(artist => `
                <li style="margin-bottom: 10px; font-size: 14px;">
                  <b style="font-size: 16px; color: #2980b9;">${artist.name}</b>
                  <br><span style="color: #34495e;">Projected Growth:</span> ${artist.projected_growth}%
                  <br><span style="color: #34495e;">Genre:</span> ${artist.genre}
                  <br><span style="color: #34495e;">Genre Compatibility:</span> ${artist.genre_compatibility}
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }).join("");
  }