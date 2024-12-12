import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

function SkillsChart({ skills }) {
  const chartRef = useRef()

  useEffect(() => {
    if (skills && chartRef.current) {
      const width = 400
      const height = 400
      const margin = 40

      const radius = Math.min(width, height) / 2 - margin

      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

      const color = d3.scaleOrdinal()
        .domain(skills)
        .range(d3.schemeDark2)

      const pie = d3.pie()
        .value(1)

      const data_ready = pie(skills)

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(100)
          .outerRadius(radius)
        )
        .attr('fill', d => color(d.data))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .transition()
        .duration(1000)
        .attrTween('d', function(d) {
          const i = d3.interpolate(d.startAngle, d.endAngle);
          return function(t) {
            d.endAngle = i(t);
            return d3.arc().innerRadius(100).outerRadius(radius)(d);
          }
        });

      svg.selectAll('text')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data)
        .attr('transform', d => `translate(${d3.arc().innerRadius(radius + 30).outerRadius(radius + 30).centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', 14)
        .style('fill', 'white')
        .style('opacity', 0)
        .transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .style('opacity', 1);
    }
  }, [skills]);

  return <div ref={chartRef}></div>;
}

function SalaryChart({ salaryRange }) {
  const chartRef = useRef();

  useEffect(() => {
    if (salaryRange && chartRef.current) {
      const width = 400;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const x = d3.scaleLinear()
        .domain([0, 200000])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => `$${d/1000}k`));

      const area = d3.area()
        .x(d => x(d[0]))
        .y0(y(0))
        .y1(d => y(d[1]));

      const [min, max] = salaryRange.match(/\d+/g).map(Number);
      const salaryData = [
        [min, 0],
        [min, 1],
        [max, 1],
        [max, 0]
      ];

      svg.append('path')
        .datum(salaryData)
        .attr('fill', '#4CAF50')
        .attr('d', area)
        .attr('opacity', 0)
        .transition()
        .duration(1000)
        .attr('opacity', 0.7);

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .text('Salary Range')
        .style('fill', 'white');
    }
  }, [salaryRange]);

  return <div ref={chartRef}></div>;
}

export default function CareerResults({ careerInfo, userAnswers }) {
  if (!careerInfo) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" rounded-lg shadow-xl p-8 mb-8"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">{careerInfo.career}</h2>
        <p className="text-xl mb-6 text-gray-600">{careerInfo.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Key Skills</h3>
            <SkillsChart skills={careerInfo.keySkills} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Salary Range</h3>
            <SalaryChart salaryRange={careerInfo.salaryRange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Job Outlook</h3>
            <p className="text-lg text-gray-600">{careerInfo.jobOutlook}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Work-Life Balance</h3>
            <p className="text-lg text-gray-600">Rating: {careerInfo.workLifeBalanceRating}/10</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Education Requirements</h3>
          <p className="text-lg text-gray-600">{careerInfo.educationRequirements}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Top Companies Hiring</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {careerInfo.topCompanies.map((company, index) => (
              <li key={index}>{company}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Related Careers</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {careerInfo.relatedCareers?.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-100 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Personalized Advice</h3>
          <p className="text-lg text-indigo-700">{careerInfo.personalizedAdvice}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Your Strengths</h3>
            <ul className="list-disc pl-5 text-lg text-gray-600">
              {careerInfo.strengthsMatch.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Areas for Improvement</h3>
            <ul className="list-disc pl-5 text-lg text-gray-600">
              {careerInfo.areasForImprovement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Career Growth Path</h3>
          <ul className="list-decimal pl-5 text-lg text-gray-600">
            {careerInfo.careerGrowthPath.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}