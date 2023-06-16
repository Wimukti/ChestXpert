import Header from '../components/common/Header.jsx';
import Layout from '../components/Layout.jsx';

import { Button, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

const configDeafult = {
  options: 'Sampling',
  seed: 42,
  temperature: 1.0,
  top_k: 0,
  top_p: 1,
  attention_head: -1,
};

function Config(props) {
  const storedConfig = localStorage.getItem('config');

  const [config, setConfig] = useState(storedConfig ? JSON.parse(storedConfig) : configDeafult);

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config));
  }, [config]);

  return (
    <Layout>
      <Header title="ChestXpert: Advanced Configuration" subtitle="" />
      <div className="section-white md:mt-5">
        <div className="section">
          <div className="block md:flex gap-20 py-10 px-5">
            <div className="md:w-1/2">
              <div className="text-2xl font-bold mb-10">
                Generation Method:
                <div className="mt-5">
                  <Select
                    fullWidth
                    value={config.options}
                    onChange={(e) => setConfig({ ...config, options: e.target.value })}
                  >
                    <MenuItem value="Sampling">Sampling</MenuItem>
                    <MenuItem value="Greedy">Greedy</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="text-2xl font-bold mb-10">
                Sampling Seed:
                <div className="mt-5">
                  <TextField
                    value={config.seed}
                    onChange={(e) => setConfig({ ...config, seed: e.target.value })}
                    fullWidth
                    type="number"
                  />
                </div>
              </div>
              <div className="text-2xl font-bold mb-10">
                Temperature:
                <div className="mt-5">
                  <TextField
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: e.target.value })}
                    fullWidth
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="text-2xl font-bold mb-10">
                Top K Value:
                <div className="mt-5">
                  <Slider
                    track={false}
                    aria-label="Default"
                    value={config.top_k}
                    onChange={(event, newValue) => setConfig({ ...config, top_k: newValue })}
                    marks={[
                      { value: 0, label: 0 },
                      { value: 17734, label: 17734 },
                    ]}
                    min={0}
                    max={17734}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold mb-10">
                Top P Value:
                <div className="mt-5">
                  <Slider
                    track={false}
                    aria-label="Default"
                    value={config.top_p}
                    onChange={(event, newValue) => setConfig({ ...config, top_p: newValue })}
                    marks={[
                      { value: 0.0, label: '0.00' },
                      { value: 1.0, label: '1.00' },
                    ]}
                    step={0.01}
                    min={0.0}
                    max={1.0}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold mb-10">
                Attention Heads:
                <div className="mt-5">
                  <Slider
                    track={false}
                    aria-label="Default"
                    value={config.attention_head}
                    onChange={(event, newValue) => setConfig({ ...config, attention_head: newValue })}
                    marks={[
                      { value: -1, label: -1 },
                      { value: 7, label: 7 },
                    ]}
                    min={-1}
                    max={7}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-5">
            <Button
              sx={{
                backgroundColor: '#c52a25',
                '&:hover': {
                  backgroundColor: '#7a100c',
                },
              }}
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={() => setConfig(configDeafult)}
            >
              Reset to deafult
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Config;
