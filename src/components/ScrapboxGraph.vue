<template>
  <v-card
    flat
    tile
  >
    <svg id="svg"/>
    <v-toolbar dense width="400">
      <v-radio-group
        v-model="project"
        :mandatory="true"
        row
        single-line
        hide-details
        >
        <v-radio label="kondoumh" value="kondoumh"></v-radio>
        <v-radio label="help-jp" value="help-jp"></v-radio>
      </v-radio-group>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <v-checkbox
        v-model="showAuthor"
        label="Author"
        single-line
        hide-details
      ></v-checkbox>
    </v-toolbar>
    <v-toolbar width="400">
      <v-range-slider
        v-model="linked.range"
        :max="linked.max"
        :min="linked.min"
        hide-details
        label="linked"
        thumb-label="sliding"
        @end="onLinkedRange"
      >
        <template v-slot:prepend>
          <v-chip>{{ linked.range[0] }}</v-chip>
        </template>
        <template v-slot:append>
          <v-chip>{{ linked.range[1] }}</v-chip>
        </template>
      </v-range-slider>
    </v-toolbar>
    <v-toolbar width="400">
      <v-range-slider
        v-model="views.range"
        :max="views.max"
        :min="views.min"
        hide-details
        thumb-label="sliding"
        label="views"
        @end="onViewRange"
      >
        <template v-slot:prepend>
          <v-chip>{{ views.range[0] }}</v-chip>
        </template>
        <template v-slot:append>
          <v-chip>{{ views.range[1] }}</v-chip>
        </template>
      </v-range-slider>

    </v-toolbar>
  </v-card>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'graph',
  components: {
  },
  data: () => ({
    showAuthor: false,
    project: '',
    linked: {
      min: 0,
      max: 100,
      slider: 40,
      range: [0, 100],
    },
    views: {
      min: 0,
      max: 1000,
      slider: 40,
      range: [0, 1000],
    }
  }),
  async mounted () {
    await this.render()
  },
  watch: {
    showAuthor: 'render',
    project: 'render'
  },
  methods: {
    onViewRange(range) {
      console.log(range[0], range[1])
    },
    onLinkedRange(range) {
      console.log(range[0], range[1])
    },
    async render() {
      d3.select('svg').selectAll('*').remove()
      const width = document.querySelector('svg').clientWidth
      const height = document.querySelector('svg').clientHeight

      const res = await fetch(`https://sb-graph-kondoumh.netlify.app/${this.project}_graph.json`, {
        mode: 'cors'
      })
      const json = await res.json()

      let nodesData = json.pages.map(page =>
      ({
        id: page.id,
        title: page.title,
        x: width * Math.random(),
        y: height * Math.random(),
        rx: 70,
        ry: 20,
        user: false
      }))

      if (this.showAuthor) {
        const users = json.users.map(user => ({
          id: user.id,
          title: user.name,
          x: width * Math.random(),
          y: height * Math.random(),
          rx: 70,
          ry: 20,
          user: true
        }))
        nodesData = nodesData.concat(users)
      }

      let linksData = json.links.map(link =>
      ({
        source: nodesData.findIndex(node => node.id === link.from),
        target: nodesData.findIndex(node => node.id === link.to),
        l: Math.random() * 200 + 5 + 70 + 20
      }))

      if (this.showAuthor) {
        const userPages = json.userPages.map(up =>
        ({
          source: nodesData.findIndex(node => node.id === up.user),
          target: nodesData.findIndex(node => node.id === up.page),
          l: Math.random() * 200 + 5 + 70 + 20
        }))
        linksData = linksData.concat(userPages)
      }

      const link = d3.select('svg')
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .attr('stroke', 'black')

      const nodeGroup = d3.select('svg')
        .selectAll('g')
        .data(nodesData)
        .enter()
        .append('g')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
        .on('click', clicked)

      nodeGroup.append('ellipse')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('rx', d => d.rx)
        .attr('ry', d => d.ry)
        .attr('fill', d => d.user ? 'Green' : 'Gold')
        .attr('stroke', 'black')

      nodeGroup.append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'steelbule')
        .text(d => d.title)
        .append('a')
        .attr('xlink:href', d => `https://scrapbox.io/${this.project}/${d.title}`)

      function clicked(d) {
        d3.selectAll('.selected').classed('selected', false)
        d3.selectAll('.conected').classed('conected', false)
        d3.selectAll('line').classed('linkSelected', false)

        d3.select(this).classed('selected', true)

        d3.selectAll('line')
          .filter((v) => {
            if (d == v.source) {
              nodeGroup.each(vj => {
                if (v.target == vj) d3.select(this).classed('conected', true)
              })
              return true
            } else if (d == v.target) {
              nodeGroup.each(vj => {
                if (v.source == vj) d3.select(this).classed('conected', true)
              })
              return true
            }
          }).classed('linkSelected', true)
      }

      const simulation = d3.forceSimulation()
        .force('link',
          d3.forceLink()
            .distance(d => d.l)
            .iterations(2))
        .force('collide',
          d3.forceCollide()
            .radius(d => d.r)
            .strength(0.7)
            .iterations(2))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('x', d3.forceX().strength(0.01).x(width / 2))
        .force('y', d3.forceY().strength(0.01).y(height / 2))
        .force('center', d3.forceCenter(width / 2, height / 2))

      simulation
        .nodes(nodesData)
        .on('tick', ticked)

      simulation.force('link')
        .links(linksData)
        .id(d => d.index)

      function ticked() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
        nodeGroup.select('ellipse')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
        nodeGroup.select('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y)
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      d3.select('#resetButton')
      .on('click', resetted)
  
      const zoom = d3.zoom()
        .scaleExtent([1/3, 40])
        .on('zoom', zoomed)

      link.call(zoom)
      nodeGroup.call(zoom)
    
      function zoomed() {
        link.attr('transform', d3.event.transform)
        nodeGroup.attr('transform', d3.event.transform)
      }
    
      function resetted() {
        link.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity)
        nodeGroup.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity)
      }
    }
  }
}
</script>

<style>
  .selected {
    fill: tomato;
  }

  .linkSelected {
    stroke: tomato;
  }

  .conected {
    fill: orange;
  }

  .toolbox {
    padding: 3px;
    background-color:darkkhaki
  }

  html, body {
    margin:0;
    padding:0;
    overflow:hidden
  }

  svg {
    background: white;
    position:fixed;
    top:30px;
    left:0;
    height:100%;
    width:100%
  }
</style>
